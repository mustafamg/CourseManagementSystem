/* Design Unique ID: 2671*/
(function (serviceCatalogCtrl) {

    var model = require('../model/cmsModel');
    var notifier = require('../services/notifier');
    var Service = model.Service;
    serviceCatalogCtrl.init = function (app) {

        /* Design Unique ID: 2672 */
        app.get("/services", function (req, res) {
            Service.find({}, function (err, service) {
                if (err) res.status(500).end();
                res.json({serviceList: service});
            });
        });
        app.get("/services/:id", function (req, res) {
            console.log(req.param("id"));
            Service.findById(req.param("id"), function (err, service) {
                if (err) return res.status(500).end();
                res.json(service);
            });
        });

        app.get("/services/announce/:id", function (req, res) {
            console.log(req.param("id"));
            Service.findById(req.param("id"), function (err, service) {
                if (err) return res.status(500).end();
                notifier.send(service.title);
                res.send(200);
            });
        });

        app.get("/serviceRequests/:serviceId", function (req, res) {
            var ServiceRequest = model.ServiceRequest;

            ServiceRequest.find({service:req.param("serviceId")})
                .populate("user")
                .exec(function (err, serReq) {
                    Service.findById(req.param("serviceId"), function (err, service) {
                        if (err) return res.status(500).end();
                        res.json({service:service, requests:serReq});
                    });
            });
        });

        /* Design Unique ID: 2673*/
        app.post("/services", function (req, res) {

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

        /* Design Unique ID: 2674*/
        app.put("/services", function (req, res) {
            if(!req.body._id)
                return res.status(404).end();
            Service.findById(req.body._id, function (err, service) {
                if (service == null)
                    return res.status(404).end();
                service.title = req.body.title;
                service.description = req.body.description;
                service.cost = req.body.cost;
                service.code = req.body.code;

                service.save(function (err, service) {
                    if (!err) {
                        res.status(200).end();
                    } else {
                        res.json(500, {message: "Could not create service. Error: " + err});
                    }
                });
            });
        });

        /* Design Unique ID: 2675*/
        app.delete("/services/:id", function (req, res) {
            Service.findById(req.param("id"), function (err, service) {
                if (service == null)
                    return res.status(404).end();

                service.remove(function (err) {
                    if (!err) {
                        res.status(204).end();
                    } else {
                        res.json(500, {message: "Could not delete service. Error: " + err});
                    }
                });
            });
        });

        /* Design Unique ID: 2676*/
        app.post("/services/register", function (req, res) {
            var User = model.User;
            var user;
            User.findOne({email: req.body.userEmail}).exec()
                .then(function (data) {
                    if (data == null) {
                        //return res.json(404, {message: "User with that email is not found: " + req.body.userEmail});
                        var createdUser = new User();
                        createdUser.name=req.body.userEmail;
                        createdUser.email = req.body.userEmail;
                        createdUser.save(function(err, usr){
                            user=usr;
                            Service.findOne({code: req.body.code}, createRequest);
                        })
                    }
                    else {
                        user=data;
                        Service.findOne({code: req.body.code}, createRequest);
                    }
                });
            function createRequest(err, service) {
                var ServiceRequest = model.ServiceRequest;
                if (err)
                    return res.json(500, {message: "Internal server error: " + err});
                if (service == null)
                    return res.json(404, {message: "No service with this id"});

                //if (service.users.indexOf(user._id) > -1)
                //    return res.json(409, {message: "User already subscribed to this service"});
                var serviceRequest = new ServiceRequest();
                serviceRequest.user = user;
                serviceRequest.service = service;
                serviceRequest.creationDate = Date.now();
                serviceRequest.save(function (err, sr) {
                    if (err) return json(500, "Error in registration to service: " + err);
                    service.requests.push(sr);
                    service.save(function (err, evnt) {
                        if (err)
                            return res.json(500, {message: "Internal server error: " + err});
                        res.json(201, {message: "created"});
                    });
                });
            };
        });

    };
})(module.exports);