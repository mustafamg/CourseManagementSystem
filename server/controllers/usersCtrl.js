/* Design Unique ID: 2671*/
(function (userCatalogCtrl) {

    var model = require('../model/cmsModel');
    var User = model.User;
    userCatalogCtrl.init = function (app) {

        /* Design Unique ID: 2672 */
        app.get("/users", function (req, res) {
            User.find({}, function (err, user) {
                if (err) res.status(500).end();
                res.json({userList: user});
            });
        });
        app.get("/users/:id", function (req, res) {
            console.log(req.param("id"));
            User.findById(req.param("id"), function (err, user) {
                if (err) return res.status(500).end();
                res.json(user);
            });
        });

        /* Design Unique ID: 2673*/
        app.post("/users", function (req, res) {

            var user = new User();
            user.name = req.body.name;
            user.email = req.body.email;
            user.altEmail = req.body.altEmail;
            user.company = req.body.company;
            user.jobTitle = req.body.jobTitle;
            user.mobile = req.body.mobile;
            user.save(function (err, user) {
                if (!err) {
                    res.json(201, {id: user._id});
                } else {
                    res.json(500, {message: "Could not create course. Error: " + err});
                }
            });
        });

        /* Design Unique ID: 2674*/
        app.put("/users", function (req, res) {

            User.findById(req.body._id, function (err, user) {
                if (user == null)
                    return res.status(404).end();
                user.name = req.body.name;
                user.email = req.body.email;
                user.altEmail = req.body.altEmail;
                user.company = req.body.company;
                user.jobTitle = req.body.jobTitle;
                user.mobile = req.body.mobile;

                user.save(function (err, user) {
                    if (!err) {
                        res.status(200).end();
                    } else {
                        res.json(500, {message: "Could not create user. Error: " + err});
                    }
                });
            });
        });

        /* Design Unique ID: 2675*/
        app.delete("/users/:id", function (req, res) {
            User.findById(req.param("id"), function (err, user) {
                if (user == null)
                    return res.status(404).end();

                user.remove(function (err) {
                    if (!err) {
                        res.status(204).end();
                    } else {
                        res.json(500, {message: "Could not delete user. Error: " + err});
                    }
                });
            });
        });

        /* Design Unique ID: 2676*/
        app.post("/users/register", function (req, res) {
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
                            User.findOne({code: req.body.code}, createRequest);
                        })
                    }
                    else {
                        user=data;
                        User.findOne({code: req.body.code}, createRequest);
                    }
                });
        });

    };
})(module.exports);