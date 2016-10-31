var Q = require('q');
var World = require('./worldModel.js');

// Promisify a few mongoose methods with the `q` promise library
var findWorld = Q.nbind(World.find, World);
var createWorld = Q.nbind(World.update, World);

module.exports = {
  getWorld: function(req, res, next) {
    findWorld({}).then(function(world){
      res.json(world);
      console.log(world);
    }).fail(function(err){
      next(err);
    })
  },
  postWorld: function(req, res, next) {
    var section = {location: req.body.locs, data: req.body.map };
    console.log('post requested', req.body);
    return createWorld({location: section.location}, section, {upsert: true, multi: false}).then(function(found){
      if (found) { console.log('found', found)
        res.send(found);
      }
    });
  },
};
