'use strict';

var mongoose = require('mongoose'),
  User = mongoose.model('User');

function listAllUsers (req, res) {
  User.find({}, function (err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
}

function createUser (req, res) {
  var newUser = new User(req.body);
  newUser.save(function (err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
}

function getUser (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
}

function getUserLogin (req, res) {
  User.find({username: req.body.username, password: req.body.password}, function (err, user) {
    if (err)
      res.send(err);
    res.json({ message: 'User successfully logged' });
  });
}

function updateUser (req, res) {
  User.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function (err, user) {
    if (err)
      res.send(err);
      Object.assign(user, req.body).save((err, user) => {
              if (err)
                res.send(err);
              res.json({ message: 'User updated!', user });
          });
  });
}


function deleteUser (req, res) {
  User.remove({
    _id: req.params.id
  }, function (err, user) {
    if (err)
      res.send(err);
    res.json({ message: 'User successfully deleted' });
  });
}

module.exports = { getUser, createUser, listAllUsers, updateUser, deleteUser, getUserLogin };
