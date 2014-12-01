var app = require('./helper/app.js');
var request = require('supertest');
var should = require('should');

var mongoose = require('mongoose');
var mockgoose = require('mockgoose');
var Model = require('../server/model/cmsModel');
mockgoose(mongoose);
var Event = mongoose.model('Event'),
    Service=mongoose.model('Service'),
    User = mongoose.model('User');
var eventId1, eventId2,
    userId;

describe('Service Catalog API, Service Registration Operation', function () {
    before(prepareDataForTest);
    function prepareDataForTest(done) {
        //mockgoose.reset();
        User.create({
            name: 'Mustafa Gamal',
            email: 'mugamal@itida.gov.eg'
        }, function (err, model) {
            if (err) done(err);
            userId = model._id;
        }).then(function () {
            Event.create([{
                title: 'Practical SOA',
                description: 'This is a practical service',
                cost: 1500
            },
                {
                    title: 'SW Arch',
                    description: 'This is a practical service',
                    cost: 1500,
                    users: [userId]
                }], function (err, event1,event2) {
                if (err) done(err);
                eventId1 = event1._id;
                eventId2 = event2._id;
            })

        }).then(function(){

                service.create([
                    {
                        title: 'SW Arch',
                        description: 'This is a practical Arch service'
                    },
                    {
                        title: 'Practical SOA',
                        description: 'This is a practical SOA service'
                    }])
            }

        ).then(function () {
                done();
            });
    }
    after(function (done) {
        clearDB(done);
    });

    function clearDB(done) {
        for (var i in mongoose.connection.collections) {
            mongoose.connection.collections[i].remove(function () {
            });
        }
        done();
    }


    it('Should register a subscriber request to a certain service and return success', function (done) {
        request(app)
            .post('/service/request')
            .send({
                userEmail: 'mugamal@itida.gov.eg',
                serviceCode: eventId1
            })
            .expect(201)//created
            .end(function (err, res) {
                if (err) return done(err);
                Event.findById(eventId1, function (err, event) {
                    if (err) done(err);
                    event.users.length.should.not.equal(0);
                });
                done();
            });
    });

});

describe('service Catalog API, service Listing Operations', function () {

    before(prepareDataForTest);
    function prepareDataForTest(done) {
        //mockgoose.reset();

        service.create([
            {
                title: 'SW Arch',
                description: 'This is a practical Arch service'
            },
            {
                title: 'Practical SOA',
                description: 'This is a practical SOA service'
            }])
            .then(function () {
                done();
            });
    }
    after(function (done) {
        clearDB(done);
    });

    function clearDB(done) {
        for (var i in mongoose.connection.collections) {
            mongoose.connection.collections[i].remove(function () {
            });
        }
        done();
    }

    it('Should return service rounds in form of eventList of a certain service', function (done) {
        request(app)
            .get('/service/rounds')/*Note: Does this provide all service rounds or a certain service rounds? Not reflected
            in design*/
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                res.body.should.hasOwnProperty("eventList").not.equal(undefined);
                done();
            });
    });


    it('Should return all the service list titles', function (done) {
        request(app)
            .get('/service/list')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                res.body.should.hasOwnProperty("serviceList").not.equal(undefined);
                done();
            });
    });

    it('should list up-coming rounds', function(done){});
});

describe('service Catalog API, service Alteration Operations "Add, Update and Delete"', function () {

    before(prepareDataForTest);
    function prepareDataForTest(done) {
        //mockgoose.reset();


        Service.create([
            {
                title: 'SW Arch',
                description: 'This is a practical Arch service'
            },
            {
                title: 'Practical SOA',
                description: 'This is a practical SOA service'
            }])


            .then(function () {
                done();
            });
    }
    after(function (done) {
        clearDB(done);
    });

    function clearDB(done) {
        for (var i in mongoose.connection.collections) {
            mongoose.connection.collections[i].remove(function () {
            });
        }
        done();
    }

    it('Should return service rounds in form of eventList of serviceId', function (done) {
        request(app)
            .get('/service/rounds')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                res.body.eventList.should.not.equal(undefined);
                done();
            });
    });


    it('Should return all the service list titles', function (done) {
        request(app)
            .get('/service/list')
            .expect(200)//Not Found
            .end(function (err, res) {
                if (err) return done(err);
                res.body.serviceList.should.not.equal(undefined);
                done();
            });
    });
});

describe('Delete operation', function(){
    it('should delete service of certain id');
});

describe('NewRound operation', function(){
    it('should create new round (event) of certain service');
});