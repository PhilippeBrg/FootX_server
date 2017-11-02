'use strict';

module.exports = function (app) {
  var team = require('../controllers/teamController');
  // club Routes
  app.route('/teams')
    .get(team.listAllTeams)
    .post(team.createTeam);

  app.route('/teams/:id')
    .get(team.getTeam)
    .put(team.updateTeam)
    .delete(team.deleteTeam);
};
