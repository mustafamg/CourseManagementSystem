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
    userId,serviceRequest1,archCourse,soaCourseId,archCourseId;

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
                    }],function (err,model) {
                    if (err) done(err);
                    serviceRequest1 = model._id;

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

        /* Design Unique ID: 2672 */
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

        /* Design Unique ID: 2673*/
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
        /* Design Unique ID: 2674*/
        it('Should update an existing service', function (done) {
            request(app)
                .put('/services')
                .send({
                    _id: serviceId1,
                    code: 'TrmServiceCodeUpdate',
                    title: 'A TRM Service Update',
                    description:'This is a TRM update'

                })
                .expect(200)//Ok
                .end(function (err, res) {
                    if (err) return done(err);
                    Service.findById(serviceId1,function(err, service){
                        should.exist(service);
                        service.code.should.equal('TrmServiceCodeUpdate');
                        service.title.should.equal('A TRM Service Update');
                        service.description.should.equal('This is a TRM update');
                        done();
                    });

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
        /* Design Unique ID: 2675*/
        it('Try to delete an existing course', function (done) {
            request(app)
                .delete('/services/'+serviceId1)
                .expect(204)//No Content
                .end(function (err, res) {
                    if (err) return done(err);
                    Service.findById(serviceId1,function(err, service){
                        should.not.exist(service);
                        done();
                    });
                });
        });
        /* Design Unique ID: 2675*/
        it('Try to delete a non existing service', function (done) {
            request(app)
                .delete('/services')
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

        /* Design Unique ID: 2676*/
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


        /* Design Unique ID: 2676*/

        it('Should return not found for a service that is not found', function (done) {
            request(app)
                .post('/services/register')
                .send({
                    userEmail: 'mugamal@itida.gov.eg',
                    code: 'InExistentCode'
                })
                .expect(404)//Not Found
                .end(function (err, res) {
                    if (err) return done(err);
                    done();
                });
        });

    });

});
