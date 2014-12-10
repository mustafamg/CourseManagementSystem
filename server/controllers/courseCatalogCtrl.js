(function (courseCatalogCtrl) {

    var model = require('../model/cmsModel');

    courseCatalogCtrl.init = function (app) {
        app.get("/course/rounds", function (req, res) {
            var Course = model.Course;
            Course.find({}, function(err, courses){
                res.json(200,{courseList: courses});
            });
        });

        app.post("/course/registerToRound", function (req, res) {
            var User = model.User;
            var Event = model.Event;
            User.findOne({email: req.body.userEmail}).exec()
                .then(function (user) {
                //if (err)
                //    return res.json(500, {message: "Internal server error: " + err});
                if (user == null)
                    return res.json(404, {message: "User with that email is not found: " + req.body.userEmail});
                Event.findById(req.body.eventId, function (err, evnt) {
                    if (err)
                        return res.json(500, {message: "Internal server error: " + err});
                    if (evnt == null)
                        return res.json(404, {message: "No event with this id"});

                    if (evnt.users.indexOf(user._id) > -1)
                        return res.json(409, {message: "User already subscribed to this event"}).end();
                    evnt.users.push(user);
                    evnt.save(function (err, evnt) {
                        if (err)
                            return res.json(500, {message: "Internal server error: " + err});
                        res.json(201, {message: "created"});
                    });
                });
            });
        });

        app.get("/course/list", function (req, res) {
            var Course = model.Course;
            Course.find({}, function (err, courses) {
                if (err) res.status(500).end();
                res.json({courseList: courses});
            });
            //var cutoff = new Date();
            //cutoff.setDate(cutoff.getDate()-5);
            //MyModel.find({modificationDate: {$lt: cutoff}}, function (err, docs) { ... });
        });

        app.get("/course/nextRound/:courseCode", function (req, res) {

            var Event = model.Event;
            Event.find({from: {$gt:Date.now()}, refId: req.param["courseCode"]}, function (err, evnts) {
                if (err) res.status(500).end();
                res.json({eventList: evnts});
            });
            //app.get('/p/:tagId', function(req, res) {
            //    res.send("tagId is set to " + req.param("tagId"));
            //});
            //var cutoff = new Date();
            //cutoff.setDate(cutoff.getDate()-5);
            //MyModel.find({modificationDate: {$lt: cutoff}}, function (err, docs) { ... });
        });

        app.post("/course/add", function (req, res) {
            var Course = model.Course;
            Course.create(req.body);
        });
    };
})(module.exports);