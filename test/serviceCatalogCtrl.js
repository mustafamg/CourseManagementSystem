var app = require('./helper/app.js');
var request = require('supertest');
var should = require('should');

var moment=require('moment');

var mongoose = require('mongoose');
var mockgoose = require('mockgoose');

var Model = require('../server/model/cmsModel');
mockgoose(mongoose);
var ServiceRequest = mongoose.model('ServiceRequest'),
    Service = mongoose.model('Service'),
    User = mongoose.model('User');
var serviceId1, serviceId2,
    userId,soaCourse,archCourse,soaCourseId,archCourseId;

var trmServiceDate= new Date('2015','02','20');
var leanServiceDate= new Date('2015','02','22');
describe('Service Catalog Operations', function () {
    trmService='TRM Service';
    leanService='Lean Strategy Service';
    beforeEach(prepareDataForTest);
    function prepareDataForTest(done) {
        //mockgoose.reset();
        User.create({
            name: 'Mustafa Gamal',
            email: 'mugamal@itida.gov.eg'
        }, function (err, model) {
            if (err) done(err);
            userId = model._id;
        }).then(function () {
            Service.create([{
                code:'TrmServiceCode',
                title: trmService,
                description: 'This is a TRM Consultation Service '
            },
                {
                    code:'LeanStrategyServiceCode',
                    title: leanService,
                    description: 'This is a Lean Strategy Consultation Service '

                }], function (err, service1, service2) {
                if (err) done(err);
                serviceId1 = service1._id;
                serviceId2 = service2._id;
            })

        }).then(function () {

                ServiceRequest.create([
                    {
                        user:[userId],
                        service: [serviceId1],
                        creationDate: trmServiceDate
                    },
                    {
                        user:[userId],
                        service: [serviceId2],
                        creationDate: leanServiceDate
                    }],function (err) {
                    if (err) done(err);

                } )
            }
        ).then(function () {
                done();
            });
    }

    afterEach(function (done) {
        clearDB(done);
    });

    function clearDB(done) {
        mockgoose.reset();
        done();
    }
    describe('Service Listing Operations"', function () {

        /*2604*/
        it('Should return a list of all services', function (done) {
            request(app)
                .get('/services')
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    res.body.should.hasOwnProperty("serviceList").not.equal(undefined);
                    res.body.serviceList[0].should.hasOwnProperty("title").equal(trmService);
                    res.body.serviceList[1].should.hasOwnProperty("title").equal(leanService);
                    done();
                });
        });
    });
    describe('Service Addition Operations', function () {

        /*2605*/
        it('Should add a new service', function (done) {
            request(app)
                .post('/services')
                .send({
                    code: 'CMMICode',
                    title: 'CMMI service',
                    description:'This is a CMMI service'
                })
                .expect(201)//Created
                .end(function (err, res) {
                    if (err) return done(err);
                    res.body.hasOwnProperty('id');
                    done();
                });
        });



    });
    describe('Service Update operation', function () {
        /*2606*/
        it('Should update an existing service', function (done) {
            request(app)
                .put('/services')
                .send({
                    id: serviceId1,
                    code: 'TrmServiceCode',
                    title: 'A TRM Service Update',
                    description:'This is a TRM update'

                })
                .expect(200)//Ok
                .end(function (err, res) {
                    if (err) return done(err);
                    done();
                });
        });
        /*2606*/
        it('Try to update a non existing service', function (done) {
            request(app)
                .put('/services')
                .send({
                    code: 'InExistentCode',
                    title: 'Updating InExistent Code',
                    description:'This should not be processed'
                })
                .expect(404)//NOT FOUND
                .end(function (err, res) {
                    if (err) return done(err);
                    done();
                });
        });
    });
    describe('Service Delete operation', function () {
        /*2607*/
        it('Try to delete an existing course', function (done) {
            request(app)
                .delete('/services')
                .send({
                    id: serviceId1
                })
                .expect(204)//No Content
                .end(function (err, res) {
                    if (err) return done(err);
                    Service.findById(serviceId1,function(err, service){
                        should.not.exist(service);
                        done();
                    });
                });
        });
        /*2607*/
        it('Try to delete a non existing course', function (done) {
            request(app)
                .delete('/courses')
                .send({
                    id: '53fbf4615c3b9f41c381b6a3'//Added as a random Id intentionally
                })
                .expect(404)//NOT FOUND
                .end(function (err, res) {
                    if (err) return done(err);
                    done();
                });
        });
    });

    describe('Service Registration Operation', function () {


        it('Should register a subscriber to a service and return success', function (done) {
            request(app)
                .post('/services/register')
                .send({
                    userEmail: 'mugamal@itida.gov.eg',
                    code: 'TrmServiceCode'
                })
                .expect(201)//created
                .end(function (err, res) {
                    if (err) return done(err);
                    ServiceRequest.find({service:serviceId1}, function (err, serviceRequest) {
                        if (err) done(err);
                        should.exist(serviceRequest);
                    });
                    done();
                });
        });

        it('Should fail to register a course subscriber that was previously subscribed', function (done) {
            request(app)
                .post('/course/registerToRound')
                .send({
                    userEmail: 'mugamal@itida.gov.eg',
                    code: eventId2
                })
                .expect(409)//conflict
                .end(function (err, res) {
                    if (err) return done(err);
                    done();
                });
        });

        it('Should return not found for a user email that has not been registered before', function (done) {
            request(app)
                .post('/course/registerToRound')
                .send({
                    userEmail: 'abc@itida.gov.eg',
                    eventId: eventId1
                })
                .expect(404)//Not Found
                .end(function (err, res) {
                    if (err) return done(err);
                    done();
                });
        });

        it('Should return not found for an event that has not been registered before', function (done) {
            request(app)
                .post('/course/registerToRound')
                .send({
                    userEmail: 'mugamal@itida.gov.eg',
                    eventId: mongoose.Schema.ObjectId
                })
                .expect(404)//Not Found
                .end(function (err, res) {
                    if (err) return done(err);
                    done();
                });
        });

    });




    describe('Course Get Next Round operation', function () {

        /*2650*/
        it('Try to get a course next round', function (done) {
            request(app)
                .get('/courses/nextRounds/SoaCode')
                .expect(200)//OK
                .end(function (err, res) {
                    should.not.exist(err);

                    should.exist(res.body.eventList);//date difference less than value
                    var from=moment(res.body.eventList[0].from);
                    var dif = from.diff(soaCourseFromDate);//.should.equalDate.
                    dif.should.be.approximately(0,1);
                    done();
                });
        });
        /*2650*/

        it('Try to get a non existing course Next Round', function (done) {
            request(app)
                .post('/courses/getCourseNextRounds')
                .send({
                    code:'NOTFOUND'
                })
                .expect(404)// Not Found
                .end(function (err, res) {
                    if (err) return done(err);
                    done();
                });
        });

    });

    describe('Course NewRound operation', function () {
        /*2651*/
        it('Should add a new course round', function (done) {
            request(app)
                .post('/courses/newRound')
                .send({
                    id: archCourseId,//Added as a random Id intentionally
                    from:courseFromDate,
                    to: courseToDate
                })
                .expect(201)//Created
                .end(function (err, res) {
                    should.not.exist(err);
                    should.exist(res.body.event);

                    var from=moment(res.body.event.from);
                    var fromDif = from.diff(courseFromDate);//.should.equalDate.
                    var to=moment(res.body.event.to);
                    var toDif = to.diff(courseToDate);//.should.equalDate.
                    should.exist(res.body.event._id);
                    fromDif.should.be.approximately(0,1);
                    toDif.should.be.approximately(0,1);
                    done();
                });
        });

        /*2651*/
        it('Try to add a new course round to a non existent course', function (done) {
            request(app)
                .post('/courses/newRound')
                .send({
                    id: '666f6f2d6261722d71757578'//Added as a random Id intentionally
                })
                .expect(404)//NOT FOUND
                .end(function (err, res) {
                    if (err) return done(err);
                    done();
                });
        });
    });

});
