'use strict';

const request = require('request');
const promise = require('promise');
const token = '1cbbcef3b6974dd5928288f5ae56b76d';
const full = 'full';
const minified = 'minified';
const compressed = 'compressed';

var routes = {
  'teamIdURL': (idTeam) => 'http://api.football-data.org/v1/teams/' + idTeam,
  'playersTeamURL': (idTeam) => 'http://api.football-data.org/v1/teams/' + idTeam + '/players',
  'fixturesForTeamURL': (idTeam) => 'http://api.football-data.org/v1/teams/' + idTeam + '/fixtures/'
  };

exports.getTeam = function (idTeam) {
  return new Promise(function (resolve, reject) {
      request({
          headers: {
            'X-Auth-Token': token,
            'X-Response-Control' : full
          },
          uri: routes.teamIdURL(idTeam)
        }, function (error, response, body) {
        if (error)
          reject('request g failed !');
        resolve(body);
      });
    });
};

exports.getPlayerForTeam = function (idTeam) {
  return new Promise(function (resolve, reject) {
      request({
          headers: {
            'X-Auth-Token': token,
            'X-Response-Control' : full
          },
          uri: routes.playersTeamURL(idTeam)
        }, function (error, response, body) {
        if (error)
          reject('request getPlayerForTeam failed !');
        resolve(body);
      });
    });
};


exports.getAllFixturesForTeam = function (idTeam) {
  return new Promise(function (resolve, reject) {
      request({
          headers: {
            'X-Auth-Token': token,
            'X-Response-Control' : full
          },
          uri: routes.fixturesForTeamURL(idTeam)
        }, function (error, response, body) {
        if (error)
          reject('request getAllFixturesForTeam failed !');
        resolve(body);
      });
    });
};
