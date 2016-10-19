var mongoose = require('mongoose');
var crypto = require('crypto');

var WorldSchema = new mongoose.Schema({
  location: {type: String, index: {unique: true}},
  data: Array
  // title: String,
  // code: String,
  // baseUrl: String,
  // url: {type: String, index: {unique: true}}
});

module.exports = mongoose.model('World', WorldSchema);
