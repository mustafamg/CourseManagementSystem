var app = require('./helper/app.js');
var request = require('supertest');
var should = require('should');

var moment=require('moment');

var mongoose = require('mongoose');
var mockgoose = require('mockgoose');
var Model = require('../server/model/cmsModel');
mockgoose(mongoose);
var Event = mongoose.model('Event'),
    Course=mongoose.model('Course'),
    User = mongoose.model('User');
var eventId1, eventId2,
    userId;
var soaCourseFromDate= moment(['2015','02','30']);
var soaCourseToDate= moment(['2015','03','01']);
var archCourseFromDate= new Date('2015','02','20');
var archCourseToDate= new Date('2015','02','22');

describe('Event Catalog Operations', function () {

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
            Event.create([{
                title: 'Practical SOA',
                description: 'This is a practical course',
                cost: 1500,
                from:soaCourseFromDate,
                to:soaCourseToDate
            },
                {
                    title: 'SW Arch',
                    description: 'This is a practical course',
                    cost: 1500,
                    from:archCourseFromDate,
                    to:archCourseToDate,
                    users: [userId]
                }], function (err, event1,event2) {
                if (err)
                    return done(err);
                eventId1 = event1._id;
                eventId2 = event2._id;
                done();
            })

        }).then(function(){

                Course.create([
                    {
                        title: 'SW Arch',
                        description: 'This is a practical Arch course'
                    },
                    {
                        title: 'Practical SOA',
                        description: 'This is a practical SOA course'
                    }])
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

    describe( 'Event Registration Operations', function () {
    it('Should register a subscriber to a event and return success', function (done) {
        request(app)
            .post('/events/register')
            .send({
                userEmail: 'mugamal@itida.gov.eg',
                eventId: eventId1
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

    it('Should fail to register a event subscriber that was previously subscribed', function (done) {
        request(app)
            .post('/course/registerToRound')
            .send({
                userEmail: 'mugamal@itida.gov.eg',
                eventId: eventId2
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
    describe( 'Event Listing Operations', function () {

        it('Should return List of all events in system', function (done) {
            request(app)
                .get('/events')/*Note: Does this provide all course rounds or a certain course rounds? Not reflected
             in design*/
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    res.body.should.hasOwnProperty("eventList").not.equal(undefined);
                    done();
                });
        });
        /*******************************************************
         it('should list up-coming rounds', function(done){});
         *******************************************************/
    });

    describe( 'Event Creation Operations', function () {

        it('Create a new event', function (done) {
            request(app)
                .post('/events')/*Note: Does this provide all course rounds or a certain course rounds? Not reflected
             in design*/
                .send({
                    userEmail: 'mugamal@itida.gov.eg',
                    eventId: eventId1
                })
                .expect(201)
                .end(function (err, res) {
                    if (err) return done(err);
                    res.body.should.hasOwnProperty("eventList").not.equal(undefined);
                    done();
                });
        });
        /*******************************************************
         it('should list up-coming rounds', function(done){});
         *******************************************************/
    });
});

