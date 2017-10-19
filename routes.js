var express = require('express');
var bodyParser = require('body-parser');
var https = require('https');
var request = require('request');
var rp = require('request-promise');
var router = express.Router();

var KEY_T = process.env.KEY_T;
var KEY_Y = process.env.KEY_Y;

var T_DATA = [];

router.get("/", function(request, response) {
    response.sendFile(__dirname + '/public/index.html');
});

router.get('/streams', function(req, res, next) {
    //let user = req.params.user;
    var follows = new Promise((resolve, reject) => {
        let options = {
            uri: "https://api.twitch.tv/kraken/users/silverrain64/follows/channels?limit=5&sortby=last_broadcast",
            headers: { 'Client-ID': KEY_T },
            json: true
        }
        rp(options, (err, res, body) => {
            if (err) reject(res.statusText);
            resolve(body);
        });
    });
    follows.then(function(body) {
       var liveList = seeWhosLive(body);
    }, function(err) {
        console.error(err);
    });
    follows.then(function(liveList) {        
        res.send(liveList);
    }, function() {
        console.error(err);
    });
});

function seeWhosLive(data) {
    let len = data._total;
    var liveList = new Promise((resolve, reject) => {
        let live = [];
        for (var i = 0; i < 3; i++) {
            let name = data.follows[i].channel.name;
            let options = {
                uri: "https://api.twitch.tv/kraken/streams/" + name,
                headers: { 'Client-ID': KEY_T },
                json: true
            }
            rp(options, function(err, res, body) {
                if (err) next(err);
                body.stream ? live.push(body.stream.channel) : live.push(`user ${name} is offline`);
            });
        }
        resolve(live);
    });
    liveList.then(function(list) {
        console.log('Promise.all: ', list);
        return list;
    }, function(err) {
        console.error(err);
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