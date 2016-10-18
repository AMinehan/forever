var Q = require('q');
var util = require('../config/utils.js');
var World = require('./worldModel.js');

var findChar = Q.nbind(Characters.findOne, Characters);
var createChar = Q.nbind(Characters.create, Characters);
var updateChar = Q.nbind(Characters.findOneAndUpdate, Characters);

signup: function (req, res, next) {
    var name = req.body.name;
    // check to see if user already exists
    findChar({charName: name})
      .then(function (char) {
        if (char) {
          return updateChar({
            charName: name,
            owner: req.body.owner,
            level: req.body.level,
            stuff: req.body.stuff
          })
        } else {
          return createChar({
            charName: name,
            owner: req.body.owner,
            level: req.body.level,
            stuff: req.body.stuff
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
