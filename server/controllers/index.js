// Design Unique ID: 2601
(function(controllers) {
    var homeController = require("./homeController"),
    	courseCatalogCtrl = require('./courseCatalogCtrl'),
        serviceCatalogCtrl=require('./serviceCatalogCtrl'),
        eventManagerCtrl=require('./eventManagerCtrl'),
    usersCtrl=require('./usersCtrl');
    controllers.init=function(app) {
        homeController.init(app);
        courseCatalogCtrl.init(app);
        serviceCatalogCtrl.init(app);
        eventManagerCtrl.init(app);
        usersCtrl.init(app);
    };
})(module.exports);