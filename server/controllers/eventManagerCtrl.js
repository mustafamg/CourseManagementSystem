(function (eventCatalogCtrl) {

    var model = require('../model/cmsModel');
    var Event = model.Event;
    eventCatalogCtrl.init = function (app) {

        /* Design Unique ID: 2637*/
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

        app.get("/events", function (req, res) {
            Event.find({}, function (err, events) {
                if (err) res.status(500).end();
                res.json({eventList: events});
            });
        });
        /* Design Unique ID: 2605*/
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

        app.put("/events", function (req, res) {

            Event.findById(req.body.id, function (err, event) {
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

        app.delete("/events", function (req, res) {
            Event.findById(req.body.id, function (err, event) {
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