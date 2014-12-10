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