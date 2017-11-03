'use strict';

const request = require('request');
const config = require('./_configApi');

const routes = {
  'competitionURL': 'http://api.football-data.org/v1/competitions/',
  'competitionIdURL': (idCompetition) => 'http://api.football-data.org/v1/competitions/' + idCompetition,
  'teamsCompetitionIdURL': (idCompetition) => 'http://api.football-data.org/v1/competitions/' + idCompetition + '/teams',
  'tableCompetitionURL': (idCompetition) => 'http://api.football-data.org/v1/competitions/' + idCompetition + '/leagueTable',
  'competitionFixtureDayURL': (idCompetition, day) => 'http://api.football-data.org/v1/competitions/' + idCompetition + '/fixtures?matchday=' + day
};

function getAllCompetitions () {
  return new Promise(function (resolve, reject) {
      request({
          headers: {
            'X-Auth-Token': config.token,
            'X-Response-Control' : config.full
          },
          uri: routes.competitionURL
        }, function (error, response, body) {
        if (error)
          reject('request getAllCompetitions failed !');
        resolve(body);
      });
    });
}

function getCompetition (idCompetition) {
  return new Promise(function (resolve, reject) {
      request({
          headers: {
            'X-Auth-Token': config.token,
            'X-Response-Control' : config.full
          },
          uri: routes.competitionIdURL(idCompetition)
        }, function (error, response, body) {
        if (error)
          reject('request getAllCompetitions failed !');
        resolve(body);
      });
    });
};

function getAllTeamsForCompetition (idCompetition) {
  return new Promise(function (resolve, reject) {
      request({
          headers: {
            'X-Auth-Token': config.token,
            'X-Response-Control' : config.full
          },
          uri: routes.teamsCompetitionIdURL(idCompetition)
        }, function (error, response, body) {
        if (error)
          reject('request getAllTeamsForCompetition failed !');
        resolve(body);
      });
  });
};

function getTableForCompetition (idCompetition) {
  return new Promise(function (resolve, reject) {
      request({
          headers: {
            'X-Auth-Token': config.token,
            'X-Response-Control' : config.full
          },
          uri: routes.tableCompetitionURL(idCompetition)
        }, function (error, response, body) {
        if (error)
          reject('request getTableForCompetition failed !');
        resolve(body);
      });
  });
};

function getFixturesDayForCompetition (idCompetition, day) {
  return new Promise(function (resolve, reject) {
    request({
        headers: {
          'X-Auth-Token': config.token,
          'X-Response-Control' : config.full
        },
        uri: routes.competitionFixtureDayURL(idCompetition, day)
      }, function (error, response, body) {
      if (error)
        reject('request getTableForCompetition failed !');
      resolve(body);
    });
  });
};

module.exports = { getTableForCompetition, getFixturesDayForCompetition, getAllTeamsForCompetition, getCompetition, getAllCompetitions };
