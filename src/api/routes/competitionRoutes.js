'use strict';

module.exports = function (app) {
var competition = require('../controllers/competitionController');

app.route('/competitions')
  .get(competition.listAllCompetitions)
  .post(competition.createCompetition);

app.route('/competitions/:id')
  .get(competition.getCompetition)
  .put(competition.updateCompetition)
  .delete(competition.deleteCompetition);

};
