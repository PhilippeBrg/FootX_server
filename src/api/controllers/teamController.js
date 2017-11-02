'use strict';

var mongoose = require('mongoose');
var Team = mongoose.model('Team');

function listAllTeams (req, res) {
  Team.find({}, function (err, team) {
    if (err)
      res.send(err);
    res.json(team);
  });
};

function createTeam (req, res) {
  var newTeam = new Team(req.body);
  newTeam.save(function (err, team) {
    if (err)
      res.send(err);
    res.json(team);
  });
};

function getTeam (req, res) {
  Team.findById(req.params.id, function (err, team) {
    if (err)
      res.send(err);
    res.json(team);
  });
};

function updateTeam (req, res) {
  Team.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function (err, team) {
    if (err)
      res.send(err);
    Object.assign(team, req.body).save((err, team) => {
            if (err)
              res.send(err);
            res.json({ message: 'Team updated!', team });
        });
  });
};

function deleteTeam (req, res) {
  Team.remove({
    _id: req.params.id
  }, function (err, team) {
    if (err)
      res.send(err);
    res.json({ message: 'Team successfully deleted' });
  });
};

module.exports = { listAllTeams, createTeam, getTeam, updateTeam, deleteTeam };
