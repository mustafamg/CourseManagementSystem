var express = require('express')
	,logger = require('morgan')
	,path = require('path')
	,stylus = require('stylus');

module.exports = function(app, config){
	app.set('views', config.rootPath + '/server/views');
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(logger('dev'));
	
	app.use(express.static(path.join(config.rootPath, 'public')));

	app.use(express.urlencoded());
	
	app.use(stylus.middleware({
		src: config.rootPath + '/public'
	}));
	if ('development' === app.get('env')) {
		app.use(express.errorHandler());
		}
};