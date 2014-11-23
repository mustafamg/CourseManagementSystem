var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , controllers = require("./server/controllers");

var app = express();

// all environments
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./config/config')[env];

require('./config/express')(app, config);

require('./config/mongoose')(config);

http.createServer(app).listen(config.port, function(){ //app.get('port')
  console.log('Express server listening on port ' + config.port);
});
//Map the routes: Must be under createServer for super test to work.
require('./config/routes')(app);

controllers.init(app);
module.exports=app;