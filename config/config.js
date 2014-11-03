var path = require('path');
var rootPath = path.normalize(__dirname + '/../');
module.exports=
	{
		development:{
			db:'mongodb://127.0.0.1:27017/cmsDb',
			rootPath: rootPath,
			port: process.env.port || 3000
		},
		production:{
			db:'mongodb://127.0.0.1:27017/cmsDb',
			rootPath: rootPath,
			port: process.env.port || 80
		}
	};