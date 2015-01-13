var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , controllers = require("./server/controllers");

var app = express();

// all environments
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
console.log(env);

var config = require('./config/config')[env];
console.log(config);
require('./config/express')(app, config);

require('./config/mongoose')(config);
var port =  process.env.Port;//env == 'development'? process.env.Port || config.port;
http.createServer(app).listen(port, function(){ //app.get('port')config.port
  console.log('Express server listening on port ' + port);
});
//Map the routes: Must be under createServer for super test to work.
require('./config/routes')(app);

controllers.init(app);
module.exports=app;