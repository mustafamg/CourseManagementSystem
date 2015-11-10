var path = require('path');
var rootPath = path.normalize(__dirname + '/../');
module.exports=
{
	development:{
		db:'mongodb://cmuser:pwd123@ds049624.mongolab.com:49624/cmdb', // mongodb://127.0.0.1:27017/cmsDb',
		rootPath: rootPath,
		port: process.env.PORT || 3000
	},
	production:{
		db:'mongodb://webroot:itida@ds031691.mongolab.com:31691/itidacms',//'mongodb://bGBRoJbzksdf:kLIAYobQssqx@mongosoup-cont002.mongosoup.de:31436/cc_bGBRoJbzksdf',
		rootPath: rootPath,
		port: process.env.PORT || 80
	}
};