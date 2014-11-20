
(function (courseCatalogCtrl) {

    var data = require("../../data");
    courseCatalogCtrl.init= function(app) {
        app.get("/", function (req, res) {
            res.render('index');//"<html><body>Hi Hi sir</body></html>");
        });
        app.post("/newRound", function(req, res) {
            var courseId = req.body.courseId;
            var User = req.body.user;
            
        });
 app.post("/registerToRound", function(req, res) {
            var courseId = req.body.courseId;
            var User = req.body.user;
            fluffy.save(function (err, fluffy) {
            	  if (err) return console.error(err);
            	  fluffy.speak();
            	});
        });

        //app.get("/", function(req, res) {
            //res.set("content-type", "application/json");
          //  data.getNotesCategories(function(err, results) {
            //    res.render("index",
              //  { Title: "Mustafa Node App", error: err, categories: results.categories });
            //});
        //});
    };
})(module.exports);