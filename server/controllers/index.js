(function(controllers) {
    var homeController = require("./homeController"),
    	courseCatalogCtrl = require('./courseCatalogCtrl'),
        serviceCatalogCtrl=require('./serviceCatalogCtrl');
    controllers.init=function(app) {
        homeController.init(app);
        courseCatalogCtrl.init(app);
        serviceCatalogCtrl.init(app);
    };
})(module.exports);