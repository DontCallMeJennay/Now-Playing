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

router.get("/", function (request, response) {
    response.sendFile(__dirname + '/public/index.html');
});

router.post('/streams', function (req, res, next) {
    T_DATA = [];
    let user = req.headers.username;
    let data = req.body;
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

function makePromise(name) {
    return new Promise((resolve, reject) => {
        let options = {
            uri: "https://api.twitch.tv/kraken/streams/" + name,
            headers: { 'Client-ID': KEY_T },
            json: true
        }
        rp(options, function (err, res, body) {
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

module.exports = router;