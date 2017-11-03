// footballDataApi reference
var competitionDataApi = require('../footballDataApi/competition');
var teamDataApi = require('../footballDataApi/teams');

// models
var Competition = require('./api/models/competitionModel');
var Player = require('./api/models/playerModel');
var Team = require('./api/models/teamModel');

// ids array
var arrayidleague = [];
var arrayidteam = [];

//for test om : 516

function populate () {
  console.log('Starting populate our football db...');
  //populateCompetitions();
  //ligue 1 2017/2018
  //populateTeams(450);
  //Campeonato Brasileiro da Série A 444
}

function populatePlayers (id) {
  teamDataApi.getPlayerForTeam(id)
    .then(JSON.parse)
    .then(function (content) {
      content.players.forEach(function (element) {
        var newPlayer = new Player({
            name: element.name,
            jerseynumber: element.jerseyNumber,
            nationality: element.nationality,
            position: element.position
          });
        console.log(newPlayer.name + ' - ' + newPlayer.position);
        newPlayer.save();
      });
    })
    .catch(function (err) {
      console.log(err);
    });
}

function populateCompetitions () {
  console.log('Starting populate competitions...');
  competitionDataApi.getAllCompetitions()
    .then(JSON.parse)
    .then(function (content) {
      content.forEach(function (element) {
        var newCompetition = new Competition({
          competition: element.caption,
          idleague: element.id,
          numberofteam: element.numberOfTeams,
          year: element.year
        });
	      console.log(newCompetition.competition + ' ' + newCompetition.idleague);
    });
    })
    .catch(function (err) {
      console.log(err);
    });
}

function populateTeams (id) {
  competitionDataApi.getAllTeamsForCompetition(id)
    .then(JSON.parse)
    .then(function (content) {
      console.log('getAllTeamsForCompetition success');
      content.teams.forEach(function (element) {
        var newTeam = new Team({
          name: element.name,
          shortname: element.shortname,
          crestUrl: element.crestUrl
        });
	      console.log(newTeam.name);
        //newTeam.save();
        var idteam = element._links.players.href.match('teams/(.*)/players');
        arrayidteam.push(idteam[1]);
    });
    arrayidteam.forEach(function (element) {
      populatePlayers(element);
    });
  })
    .catch(function (err) {
      console.log(err);
    });
}

module.exports = { populate };
