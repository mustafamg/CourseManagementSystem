
(function (homeController) {

    var data = require("../data");
    homeController.init= function(app) {
        app.get("/", function (req, res) {
            res.send("<html><body>Hi Hi sir</body></html>");
        });
        app.post("/newCategory", function(req, res) {
            var category = req.body.categoryName;
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