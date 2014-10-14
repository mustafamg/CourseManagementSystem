(function(database) {
    var mongodb = require("mongoose");
    var mongoUrl = "mongodb://127.0.0.1:27017/cmsDb";
    var thedb = null;
    database.getDb = function(next) {
       
            next(null, null);
        
    };
})(module.exports);