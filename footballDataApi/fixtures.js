'use strict';

const request = require('request');
const promise = require('promise');
const token = '1cbbcef3b6974dd5928288f5ae56b76d';
const full = 'full';
const minified = 'minified';
const compressed = 'compressed';

const options = {
  headers: {
    'X-Auth-Token' : token,
    'X-Response-Control' : full // default
  }
};

var routes = {
  'competitionURL': 'http://api.football-data.org/v1/competitions/',
  'competitionIdURL': (idCompetition) => 'http://api.football-data.org/v1/competitions/' + idCompetition,
  'teamsCompetitionIdURL': (idCompetition) => 'http://api.football-data.org/v1/competitions/' + idCompetition + '/teams',
  'tableCompetitionURL': (idCompetition) => 'http://api.football-data.org/v1/competitions/' + idCompetition + '/leagueTable',
  'competitionFixtureDayURL': (idCompetition, day) => 'http://api.football-data.org/v1/competitions/' + idCompetition + '/fixtures?matchday=' + day
};

exports.getAllCompetitions = function () {
  return new Promise(function (resolve, reject) {
      request(routes.competitionURL, function (error, response, body) {
        if (error)
          reject('request getAllCompetitions failed !');
        resolve(body);
      });
    });
}

exports.getCompetition = function (idCompetition) {
  return new Promise(function (resolve, reject) {
      request(routes.competitionIdURL(idCompetition), function (error, response, body) {
        if (error)
          reject('request getAllCompetitions failed !');
        resolve(body);
      });
    });
}

exports.getAllTeamsForCompetition = function (idCompetition) {
  return new Promise(function (resolve, reject) {
      request(routes.teamsCompetitionIdURL(idCompetition), function (error, response, body) {
        if (error)
          reject('request getAllTeamsForCompetition failed !');
        resolve(body);
      });
  });
}

exports.getTableForCompetition = function (idCompetition) {
  return new Promise(function (resolve, reject) {
      request(options.tableCompetitionURL(idCompetition), function (error, response, body) {
        if (error)
          reject('request getTableForCompetition failed !');
        resolve(body);
      });
  });
}

exports.getFixturesDayForCompetition = function (idCompetition, day) {
  return new Promise(function (resolve, reject) {
    request(options.competitionFixtureDayURL(idCompetition, day), function (error, response, body) {
      if (error)
        reject('request getTableForCompetition failed !');
      resolve(body);
    });
  });
}
