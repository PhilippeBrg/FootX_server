const playerRoutes = require('./playerRoutes');
const teamRoutes = require('./teamRoutes');
const competitionRoutes = require('./competitionRoutes');
const userRoutes = require('./userRoutes');

module.exports = function (app, db) {
  playerRoutes(app, db);
  teamRoutes(app, db);
  competitionRoutes(app, db);
  userRoutes(app, db);
  // add futures routes here
};
