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
var HOST_URL = "http://localhost/oauth";

var T_DATA = [];
var tCode = "";

router.get("/", function(request, response) {
    response.sendFile(__dirname + '/public/index.html');
});

/* I'm not sure I actually need this...

router.get("/auth", function(request, response) {
    let uri = `https://api.twitch.tv/kraken/oauth2/authorize
    ?client_id=${KEY_T}
    &redirect_uri=${HOST_URL}
    &response_type=token&scope=user_read`;
    rp(uri, (err, res, body) => {
        if(err) console.error(res.statusText);
        //
    }).then(function(res) {
        res.send(res);
    });
});

router.post("/auth", function(request, response) {
    let uri= `https://api.twitch.tv/kraken/oauth2/token
    ?client_id=${KEY_T}
    &client_secret=${SECRET_T}
    &code=${tCode}
    &grant_type=authorization_code
    &redirect_uri=${HOST_URL}`
    rp(uri, (err, res, body) => {
        if(err) console.error(res.statusText);

    });
})
*/

router.get('/streams', function(req, res, next) {
    //let user = req.params.user;
    T_DATA = [];
    var follows = new Promise((resolve, reject) => {
        let options = {
            uri: "https://api.twitch.tv/kraken/users/silverrain64/follows/channels?limit=20&sortby=last_broadcast",
            headers: { 'Client-ID': KEY_T },
            json: true
        }
        rp(options, (err, res, body) => {
            if (err) reject(res.statusText);
            resolve(body);
        });
    });

    Promise.resolve(follows).then((data) => {
        var whosLive = new Promise((resolve, reject) => {
            for (var i = 0; i < 20; i++) {
                let name = data.follows[i].channel.name;
                let x = makePromise(name);
                T_DATA.push(x);
            }
        });

        Promise.all(T_DATA).then((data) => {
            res.send(data);
        });


    });
});

function makePromise(name) {
    return new Promise((resolve, reject) => {
        let options = {
            uri: "https://api.twitch.tv/kraken/streams/" + name,
            headers: { 'Client-ID': KEY_T },
            json: true
        }
        rp(options, function(err, res, body) {
            if (err) next(err);
            if (body.stream) {
                resolve(body.stream.channel);
            } else {
                let offline = {
                    "display_name": name,
                    "logo": "/public/offline.png",
                    "status": "stream offline"
                }
                resolve(offline);
            };
        });
    });
}

/*
router.get('/videos', function(req, res, next) {
  //let name = req.params.name;
    $.ajax({
        type: "GET",
        dataType: "json",
        url: 'https://api.twitch.tv/kraken/streams/' + name,
        headers: { 'Client-ID': KEY_Y },
        error: (err) => console.log(err.message),
        success: function(data) {
            res.send(data);
        }
    });
});
*/

module.exports = router;