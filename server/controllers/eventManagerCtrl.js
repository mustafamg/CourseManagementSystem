/* Design Unique ID: 2625*/
(function (eventCatalogCtrl) {

    var model = require('../model/cmsModel');
    var Event = model.Event;
    eventCatalogCtrl.init = function (app) {

        /* Design Unique ID: 2626*/
        app.get("/events", function (req, res) {
            Event.find({}, function (err, events) {
                if (err) res.status(500).end();
                res.json({eventList: events});
            });
        });
        app.get("/events/:id", function (req, res) {
            console.log(req.param("id"));
            Event.findById(req.param("id"), function (err, event) {
                if (err) return res.status(500).end();
                res.json(event);
            });
        });

        /* Design Unique ID: 2663*/
        app.post("/events/register", function (req, res) {
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

        /* Design Unique ID: 2627*/
        app.post("/events", function (req, res) {
            var event = createEvent(req.body);
            event.save(function (err, event) {
                if (!err) {
                    res.json(201, {id: event._id});
                } else {
                    res.json(500, {message: "Could not create event. Error: " + err});
                }
            });
        });

        /* Design Unique ID: 2628*/
        app.put("/events", function (req, res) {

            Event.findById(req.body._id, function (err, event) {
                if (event == null)
                    return res.status(404).end();
                var event = fillEvent(event, req.body);

                event.save(function (err, event) {
                    if (!err) {
                        res.status(200).end();
                    } else {
                        res.json(500, {message: "Could not create event. Error: " + err});
                    }
                });
            });
        });

        /* Design Unique ID: 2629*/
        app.delete("/events/:id", function (req, res) {
            Event.findById(req.param("id"), function (err, event) {
                if (event == null)
                    return res.status(404).end();

                event.remove(function (err) {
                    if (!err) {
                        res.status(204).end();
                    } else {
                        res.json(500, {message: "Could not delete event. Error: " + err});
                    }
                });
            });
        });

        /* Design Unique ID: 2631*/
        app.get("/events/notify/:id", function (req, res) {
           res.json(500,{message: "Notify is not implemented!!"});
        });

        function createEvent(body){
            var event = new Event();
            return fillEvent(event,body);
        };

        function fillEvent(event, body){
            event.title = body.title;
            event.description = body.description;
            event.cost = body.cost;
            event.from = body.from;
            event.to = body.to;
            return event;
        };
    };
})(module.exports);