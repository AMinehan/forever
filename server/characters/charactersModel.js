var mongoose = require('mongoose');
var crypto = require('crypto');

var CharactersSchema = new mongoose.Schema({
  charName: {type: String, index: {unique: true}},
  owner: String,
  level: Number,
  stuff: Array
  // baseUrl: String,
  // url: {type: String, index: {unique: true}}
});

CharactersSchema.methods.save = function(infos) {


};

module.exports = mongoose.model('Characters', CharacterSchema);
