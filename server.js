require('dotenv').config();
var express = require('express');
var app = express();
var index = require('./routes');
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 7441;

app.use('/public', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', index);
app.use('/streams', index);
app.use('/videos', index);

// listen for requests :)
var listener = app.listen(PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
