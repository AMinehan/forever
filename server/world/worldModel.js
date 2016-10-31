var mongoose = require('mongoose');
var crypto = require('crypto');

var WorldSchema = new mongoose.Schema({
  location: {type: String, index: {unique: true}},
  data: Array
});

module.exports = mongoose.model('World', WorldSchema);
