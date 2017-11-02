'use strict';

var mongoose = require('mongoose'),
  Player = mongoose.model('Player');

function listAllPlayers (req, res) {
  Player.find({}, function (err, player) {
    if (err)
      res.send(err);
    res.json(player);
  });
}

function createPlayer (req, res) {
  var newPlayer = new Player(req.body);
  newPlayer.save(function (err, player) {
    if (err)
      res.send(err);
    res.json(player);
  });
}

function getPlayer (req, res) {
  Player.findById(req.params.id, function (err, player) {
    if (err)
      res.send(err);
    res.json(player);
  });
}

function updatePlayer (req, res) {
  Player.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function (err, player) {
    if (err)
      res.send(err);
      Object.assign(player, req.body).save((err, player) => {
              if (err)
                res.send(err);
              res.json({ message: 'Player updated!', player });
          });
  });
}


function deletePlayer (req, res) {
  Player.remove({
    _id: req.params.id
  }, function (err, player) {
    if (err)
      res.send(err);
    res.json({ message: 'Player successfully deleted' });
  });
}

module.exports = { getPlayer, createPlayer, listAllPlayers, updatePlayer, deletePlayer };
