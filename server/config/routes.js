var worldController = require('../world/worldController.js');
var userController = require('../users/userController.js');
var helpers = require('./helpers.js');

module.exports = function (app, express) {

  app.post('/api/users/signin', userController.signin);
  app.post('/api/users/signup', userController.signup);
  app.get('/api/users/signedin', userController.checkAuth);

  app.post('/api/world/', worldController.postWorld);
  app.get('/api/world/', worldController.getWorld);
  app.get('/api/player/', userController.player);

  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);
};

