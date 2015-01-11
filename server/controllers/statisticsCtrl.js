/* Design Unique ID: 2620*/
(function (serviceCatalogCtrl) {

    var model = require('../model/cmsModel');
    var Service = model.Service;
    serviceCatalogCtrl.init = function (app) {

        app.get("/statistics/numberOfEventRequests/:eventId", function (req, res) {
            var Event = model.Event;
            Event.aggregate([
                { $match: { }},
                { $unwind: "$users" },
                { $group: {
                    _id: "$_id",
                    count: { $sum: 1 }
                }}
            ], function (err, result) {
                if (err) {
                    console.log(err);
                    return;
                }
                res.json(200,{events:result});
            });
        });

        /* Design Unique ID: 2621*/
        app.get("/statistics/numberOfServiceRequests/:serviceId", function (req, res) {
            var Service = model.Service;
            /*ServiceRequest.count({service:req.param("serviceId")}, function (err, count) {
                if (err) res.status(500).end();
                res.json({count:count});
            });*/

            Service.aggregate([
                { $match: { }},
                { $unwind: "$records" },
                { $group: {
                    _id: "$_id",
                    count: { $sum: 1 }
                }}
            ], function (err, result) {
                if (err) {
                    console.log(err);
                    return;
                }
                res.json(200,{requests:result});
            });
        });
    };
})(module.exports);