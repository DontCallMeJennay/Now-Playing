var express = require('express');
var async = require('async');
var bodyParser = require('body-parser');
var https = require('https');
var request = require('request');
var rp = require('request-promise');
var router = express.Router();

var KEY_T = process.env.KEY_T;
var KEY_Y = process.env.KEY_Y;
var SECRET_T = process.env.SECRET_T;

var T_DATA = [];
var tCode = "";

router.get("/", function (request, response) {
    response.sendFile(__dirname + '/public/index.html');
});

router.post('/streams', function (req, res, next) {
    let user = req.headers.username;
    var getList = new Promise((resolve, reject) => {
        let options = {
            uri: "https://api.twitch.tv/helix/users?login=" + user,
            headers: {
                "Client-ID": KEY_T
            },
            json: true
        };
        rp(options)                                     //request numeric user ID for given username
            .then((res) => {
                let userid = res.data[0].id;
                let options = {
                    uri: "https://api.twitch.tv/helix/users/follows?first=100&from_id=" + userid,
                    headers: {
                        "Client-ID": KEY_T
                    },
                    json: true
                };
                rp(options)                             //use numeric ID to get follow list and assemble string
                    .then((res) => {
                        let userList = [];
                        for (var i in res.data) {
                            userList.push(res.data[i]["to_id"]);
                        }
                        const userStr = userList.join("&user_id=");
                        let options = {
                            uri: "https://api.twitch.tv/helix/streams?first=100&user_id=" + userStr,
                            headers: {
                                "Client-ID": KEY_T
                            },
                            json: true
                        };
                        rp(options)                     //requesting details for follow list
                            .then((res) => {
                                let allData = [];
                                let getNames = [];
                                allData.push(res.data);
                                for (var j in res.data) {
                                    if (res.data[j].type === "live") {
                                        getNames.push(res.data[j]["user_id"]);                                   
                                    }
                                }
                                let options = {
                                    uri: "https://api.twitch.tv/helix/users?id=" + getNames.join("&id="),
                                    headers: {
                                        "Client-ID": KEY_T
                                    },
                                    json: true
                                };
                                rp(options)             //requesting display names for follow list user IDs
                                    .then((res) => {
                                        allData.push(res.data);
                                        resolve(allData);
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                    });
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    });
    Promise.resolve(getList).then((data) => {
        res.send(data);
    });

});


module.exports = router;