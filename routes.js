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
        rp(options)
            .then((res) => {                             //request numeric user ID for username
                let userid = res.data[0].id;
                let options = {
                    uri: "https://api.twitch.tv/helix/users/follows?from_id=" + userid,
                    headers: {
                        "Client-ID": KEY_T
                    },
                    json: true
                };
                rp(options)                             //get follow list and make string of user IDs
                    .then((res) => {
                        let userList = [];
                        for (var i in res.data) {
                            userList.push(res.data[i]["to_id"]);
                        }
                        const userStr = userList.join("&user_id=");
                        let options = {
                            uri: "https://api.twitch.tv/helix/streams?first=20&user_id=" + userStr,
                            headers: {
                                "Client-ID": KEY_T
                            },
                            json: true
                        };
                        rp(options)                     //request info for list of user IDs
                            .then((res) => {
                               resolve(res);
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