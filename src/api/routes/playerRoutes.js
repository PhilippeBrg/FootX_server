'use strict';
module.exports = function (app) {
  var players = require('../controllers/playerController');
  // player Routes
  app.route('/players')
    .get(players.listAllPlayers)
    .post(players.createPlayer);

  app.route('/players/:id')
    .get(players.getPlayer)
    .put(players.updatePlayer)
    .delete(players.deletePlayer);
};
