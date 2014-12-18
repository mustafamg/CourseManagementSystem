(function (serviceCatalogCtrl) {

    var model = require('../model/cmsModel');
    var Service = model.Service;
    serviceCatalogCtrl.init = function (app) {

        /* Design Unique ID: */
        app.get("/services", function (req, res) {
            Course.find({}, function (err, service) {
                if (err) res.status(500).end();
                res.json({courseList: service});
            });
        });

        /* Design Unique ID: */
        app.post("/service", function (req, res) {

            var service = new Service();
            service.code = req.body.code;
            service.title = req.body.title;
            service.description = req.body.description;

            service.save(function (err, service) {
                if (!err) {
                    res.json(201, {id: service._id});
                } else {
                    res.json(500, {message: "Could not create course. Error: " + err});
                }
            });
        });

        app.put("/services", function (req, res) {

            Course.findById(req.body.id, function (err, service) {
                if (service == null)
                    return res.status(404).end();
                service.title = req.body.title;
                service.description = req.body.description;
                service.cost = req.body.cost;

                service.save(function (err, service) {
                    if (!err) {
                        res.status(200).end();
                    } else {
                        res.json(500, {message: "Could not create course. Error: " + err});
                    }
                });
            });
        });

        app.delete("/services", function (req, res) {
            Service.findById(req.body.id, function (err, course) {
                if (service == null)
                    return res.status(404).end();

                service.remove(function (err) {
                    if (!err) {
                        res.status(204).end();
                    } else {
                        res.json(500, {message: "Could not delete course. Error: " + err});
                    }
                });
            });
        });

        app.post("/service/register", function (req, res) {
            var User = model.User;
            var ServiceRequest = model.ServiceRequest;
            User.findOne({email: req.body.userEmail}).exec()
                .then(function (user) {
                    if (user == null)
                        return res.json(404, {message: "User with that email is not found: " + req.body.userEmail});
                    Service.findOne({code: req.body.code}, function (err, service) {
                        if (err)
                            return res.json(500, {message: "Internal server error: " + err});
                        if (service == null)
                            return res.json(404, {message: "No service with this id"});

                        if (service.users.indexOf(user._id) > -1)
                            return res.json(409, {message: "User already subscribed to this service"}).end();
                        var serviceRequest = new ServiceRequest();
                        serviceRequest.user = user;
                        serviceRequest.service = service;
                        serviceRequest.creationDate = Date.now();
                        serviceRequest.save(function (err, sr) {
                            service.serviceRequests.push(serviceRequest);
                            service.save(function (err, evnt) {
                                if (err)
                                    return res.json(500, {message: "Internal server error: " + err});
                                res.json(201, {message: "created"});
                            });
                        });

                    });
                });
        });
    };
})(module.exports);