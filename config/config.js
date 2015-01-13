var path = require('path');
var rootPath = path.normalize(__dirname + '/../');
module.exports=
	{
		development:{
			db:'mongodb://127.0.0.1:27017/cmsDb',
			rootPath: rootPath,
			port: process.env.PORT || 3000
		},
		production:{
			db:'mongodb://bGBRoJbzksdf:kLIAYobQssqx@mongosoup-cont002.mongosoup.de:31436/cc_bGBRoJbzksdf',
			rootPath: rootPath,
			port: process.env.PORT || 80
		}
	};