'use strict';

module.exports = function (app) {
  var user = require('../controllers/userController');

  app.route('/users')
    .get(user.listAllUsers)
    .post(user.getUserLogin);

  app.route('/users/create')
    .post(user.createUser);

  app.route('/users/:id')
    .get(user.getUser)
    .put(user.updateUser)
    .delete(user.deleteUser);
};
