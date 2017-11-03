const express = require('express');
const server = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const morgan = require('morgan');
// declare models
var Player = require('./api/models/playerModel');
var Team = require('./api/models/teamModel');
var Competition = require('./api/models/competitionModel');
var User = require('./api/models/userModel');

// Populate our db with data
var populate = require('./populate');

const bodyParser = require('body-parser');
var config = require('./_config');

// setup morgan logs
server.use(morgan('dev'));

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(config.mongoURI[server.settings.env], function (err, res) {
  if(err) {
    console.log('Error connecting to the database. ' + err);
  } else {
    console.log('Connected to Database: ' + config.mongoURI[server.settings.env]);
  }
});



server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

//router
require('./api/routes/router')(server, {});

//populate.populate();

server.use(function (req, res) {
  res.status(404).send({url: req.oriinalUrl + ' not found'});
});

server.listen(port, () => {
  console.log('FootX RESTful API server started on: ' + port);
});

module.exports = server;
