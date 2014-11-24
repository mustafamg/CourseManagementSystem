(function(courseCatalogCtrl) {

	var model = require('../model/cmsModel');

	courseCatalogCtrl.init = function(app) {
		app.get("/course/rounds", function(req, res) {
			res.json({eventList:[{name:"sdfa"}]});
			res.status(200).end();
		});

		app.post("/course/registerToRound", function(req, res) {
			// var courseId = req.body.courseId;
			//res.status(200).end();
			var User = model.User;// req.body.user;
			var Event = model.Event;
			User.findOne({email : req.body.userEmail}, function(err, user) {
				if (err)
					res.send(500, err);
				Event.findById(req.body.eventId, function(err, event) {
					if (err)
						res.send(500, err);
					event.users.push(user);
					event.save(function(err, event) {
						if (err)
							res.send(500, err);
						res.status(201).end('Created');
					});
				});
			});
		});

		// app.get("/", function(req, res) {
		// res.set("content-type", "application/json");
		// data.getNotesCategories(function(err, results) {
		// res.render("index",
		// { Title: "Mustafa Node App", error: err, categories:
		// results.categories });
		// });
		// });
	};
})(module.exports);