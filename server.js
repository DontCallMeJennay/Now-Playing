//require('dotenv').config();
var express = require('express');
var app = express();
var path = require('path');
var index = require('/public/routes');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var PORT = process.env.PORT || 3000;

app.use('/', express.static('public/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

app.use('/', index);

var listener = app.listen(PORT, function () {
  console.log('Listening on port ' + listener.address().port);
});
