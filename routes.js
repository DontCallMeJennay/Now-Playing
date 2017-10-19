var express = require('express');
var router = express.Router();
var https = require('https');
var request = require('request');

var KEY_T = process.env.KEY_T;
var KEY_Y = process.env.KEY_Y;

var T_DATA = [];

router.get("/", function(request, response) {
    response.sendFile(__dirname + '/public/index.html');
});

function seeWhosLive(name) {
    console.log('seeWhosLive() fired');
    let options = {
        url: "https://api.twitch.tv/kraken/streams/" + name,
        headers: { 'Client-ID': KEY_T }
    }
    request(options, function(err, res, body) {
        if (err) next(err);
        res.stream ? tData.push(body.stream.channel) : T_DATA.push("user " + name + " is offline");
    });
}

router.get('/streams', function(req, res, next) {
    //let user = req.params.user;
    let options = {
        url: "https://api.twitch.tv/kraken/users/silverrain64/follows/channels?limit=5&sortby=last_broadcast",
        headers: { 'Client-ID': KEY_T }
    }
    request(options, function(err, resp, body) {
        if (err) next(err);
        console.log(resp.body.follows);
        //var len = resp.follows.length;
        for (let i = 0; i < 5; i++) {
            //this.seeWhosLive(resp.follows[i].channel.name.toString());
        }      
    });
});

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