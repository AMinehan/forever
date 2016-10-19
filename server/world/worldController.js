var Q = require('q');
var util = require('../config/utils.js');
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
  // allLinks: function (req, res, next) {
  //   findAllLinks({})
  //     .then(function (links) {
  //       res.json(links);
  //     })
  //     .fail(function (error) {
  //       next(error);
  //     });
  // },

  // newLink: function (req, res, next) {
  //   var url = req.body.url;
  //   if (!util.isValidUrl(url)) {
  //     return next(new Error('Not a valid url'));
  //   }

  //   findLink({url: url})
  //     .then(function (match) {
  //       if (match) {
  //         res.send(match);
  //       } else {
  //         return util.getUrlTitle(url);
  //       }
  //     })
  //     .then(function (title) {
  //       if (title) {
  //         var newLink = {
  //           url: url,
  //           visits: 0,
  //           baseUrl: req.headers.origin,
  //           title: title
  //         };
  //         return createLink(newLink);
  //       }
  //     })
  //     .then(function (createdLink) {
  //       if (createdLink) {
  //         res.json(createdLink);
  //       }
  //     })
  //     .fail(function (error) {
  //       next(error);
  //     });
  // },

  // navToLink: function (req, res, next) {
  //   findLink({code: req.params.code})
  //     .then(function (link) {
  //       if (!link) {
  //         return next(new Error('Link not added yet'));
  //       }

  //       link.visits++;
  //       link.save(function (err, savedLink) {
  //         if (err) {
  //           next(err);
  //         } else {
  //           res.redirect(savedLink.url);
  //         }
  //       });
  //     })
  //     .fail(function (error) {
  //       next(error);
  //     });
  // }

};
