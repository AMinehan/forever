var express = require('express');
var mongoose = require('mongoose');

var app = express();

// connect to mongo database named "forever"
mongoose.connect('mongodb://localhost/forever');

// configure server with all the middleware and routing
require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);

// start listening to requests on port 3000
app.listen(3000);
console.log('listening on 3000');

module.exports = app;
