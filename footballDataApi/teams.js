'use strict';

const request = require('request');
const config = require('./_configApi');

const routes = {
  'teamIdURL': (idTeam) => 'http://api.football-data.org/v1/teams/' + idTeam,
  'playersTeamURL' : (idTeam) => 'http://api.football-data.org/v1/teams/' + idTeam + '/players',
  'fixturesForTeamURL' : (idTeam) => 'http://api.football-data.org/v1/teams/' + idTeam + '/fixtures/'
};

function getTeam (idTeam) {
  return new Promise(function (resolve, reject) {
      request({
          headers: {
            'X-Auth-Token': config.token,
            'X-Response-Control' : config.full
          },
          uri: routes.teamIdURL(idTeam)
        }, function (error, response, body) {
        if (error)
          reject('request getTeam failed !');
        resolve(body);
      });
    });
}

function getPlayerForTeam (idTeam) {
  return new Promise(function (resolve, reject) {
      request({
          headers: {
            'X-Auth-Token': config.token,
            'X-Response-Control' : config.full
          },
          uri: routes.playersTeamURL(idTeam)
        }, function (error, response, body) {
        if (error)
          reject('request getPlayerForTeam failed !');
        resolve(body);
      });
    });
}

function getAllFixturesForTeam (idTeam) {
  return new Promise(function (resolve, reject) {
      request({
          headers: {
            'X-Auth-Token': config.token,
            'X-Response-Control' : config.full
          },
          uri: routes.fixturesForTeamURL(idTeam)
        }, function (error, response, body) {
        if (error)
          reject('request getAllFixturesForTeam failed !');
        resolve(body);
      });
    });
}

module.exports = { getAllFixturesForTeam, getPlayerForTeam, getTeam };
