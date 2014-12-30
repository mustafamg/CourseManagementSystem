(function(controllers) {
    var homeController = require("./homeController"),
    	courseCatalogCtrl = require('./courseCatalogCtrl'),
        serviceCatalogCtrl=require('./serviceCatalogCtrl');
        eventManagerCtrl=require('./eventManagerCtrl');
    controllers.init=function(app) {
        homeController.init(app);
        courseCatalogCtrl.init(app);
        serviceCatalogCtrl.init(app);
        eventManagerCtrl.init(app);
    };
})(module.exports);