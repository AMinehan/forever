var mongoose = require('mongoose');
var crypto = require('crypto');

var WorldSchema = new mongoose.Schema({
  // : Number,
  // link: String,
  // title: String,
  // code: String,
  // baseUrl: String,
  // url: {type: String, index: {unique: true}}
});

var createSha = function (url) {
  var shasum = crypto.createHash('sha1');
  shasum.update(url);
  return shasum.digest('hex').slice(0, 5);
};

WorldSchema.pre('save', function (next) {
  var code = createSha(this.url);
  this.code = code;
  next();
});

module.exports = mongoose.model('World', WorldSchema);
