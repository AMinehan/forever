var Q = require('q');
var util = require('../config/utils.js');
var World = require('./worldModel.js');

var findChar = Q.nbind(Characters.findOne, Characters);
var createChar = Q.nbind(Characters.create, Characters);
var updateChar = Q.nbind(Characters.findOneAndUpdate, Characters);
var removeChar = Q.nbind(Characters.findOneAndremove, Characters);

create: function (req, res, next) {
    var name = req.body.name;
    // check to see if character already exists
    findChar({charName: name})
      .then(function (char) {
        if (char) {
          next(new Error('Character already exists'));
        } else {
          return createChar({
            charName: name,
            owner: req.body.owner,
            level: 1,
            stuff: []
          });
        }
      })
      .then(function (user) {
        // create token to send back for auth
        var token = jwt.encode(user, 'secret');
        res.json({token: token});
      })
      .fail(function (error) {
        next(error);
      });
    },

dies: function(req, res, next) {
  removeChar({charName: req.body.name})
}