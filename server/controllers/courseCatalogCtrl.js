(function (courseCatalogCtrl) {

	var model = require('../model/cmsModel');

	courseCatalogCtrl.init= function(app) {
		
		app.get("/course/newRound", function(req, res) {
			res.json({msg:"success"});
		});

		app.post("/registerToRound", function(req, res) {
			//var courseId = req.body.courseId;
			var User = model.User;//req.body.user;
			var Event = model.Event;
			User.find(function (err,user){
				if(err) res.send(500, err);
				Event.find(function (err, event) {
					if (err) res.send(500,err);
					event.push(user);
					event.save(function (err, event) {
						if (err) res.send(500, err);
						res.status(200).end('Created');//json({success: true});
					});
				});
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