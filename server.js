/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , controllers = require("./server/controllers");

var app = express();
//Map the routes
controllers.init(app);

// all environments
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./config/config')[env];

require('./config/express')(app, config);

require('./config/routes')(app);

require('./config/mongoose')(config);
//app.set('port', process.env.PORT || 3000);
// development only

//app.get('/', routes.index);
//app.get('/users', user.list);
//Database section


http.createServer(app).listen(config.port, function(){ //app.get('port')
  console.log('Express server listening on port ' + app.get('port'));
});
