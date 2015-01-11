
(function (homeController) {

    //var data = require("../../data");
    homeController.init= function(app) {
        app.get("/", function (req, res) {
            res.render('partials/login');
        });
        app.post('/', function(req, res) {
            if(req.body.userName=="admin" && req.body.password=="admin")
                res.render('index');
            else
                res.render('partials/login');
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