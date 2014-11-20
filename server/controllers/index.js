(function(controllers) {
    var homeController = require("./homeController"),
    	courseCatalogCtrl = require('./courseCatalogCtrl');
    controllers.init=function(app) {
        homeController.init(app);
        courseCatalogCtrl.init(app);
    };
})(module.exports);