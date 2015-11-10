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

var soaConsultationFromDate= new Date('2015','02','30');
var soaConsultationCourseToDate= new Date('2015','03','01');
var archConsultationFromDate= new Date('2015','02','20');
var archConsultationToDate= new Date('2015','02','22');
var fossEventFromDate= new Date('2015','02','20');
var fossEventToDate= new Date('2015','02','22');

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
                from:soaConsultationFromDate,
                to:soaConsultationCourseToDate
            },
                {
                    title: 'SW Arch',
                    description: 'This is a practical course',
                    cost: 1500,
                    from:archConsultationFromDate,
                    to:archConsultationToDate,
                    users: [userId]
                }], function (err, events) {
                if (err)
                    return done(err);
                eventId1 = events[0]._id;
                eventId2 = events[1]._id;
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
        /* Design Unique ID: 2663*/
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
        /* Design Unique ID: 2663*/
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
        /* Design Unique ID: 2663*/
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
        /* Design Unique ID: 2663*/
	it('Should return not found for an event that has not been registered before', function (done) {
		request(app)
			.post('/course/registerToRound')
			.send({
				userEmail: 'mugamal@itida.gov.eg',
				eventId: mongoose.Types.ObjectId()
			})
			.expect(404)//Not Found
			.end(function (err, res) {
				if (err) return done(err);
				done();
			});
	});
});
    /* Design Unique ID: 2626*/
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
        /* Design Unique ID: 2627*/
        it('Create a new event', function (done) {
            request(app)
                .post('/events')/*Note: Does this provide all course rounds or a certain course rounds? Not reflected
             in design*/
                .send({
                    title: 'FOSS',
                    description: 'This is a FOSS event',
                    cost: 1500,
                    from:fossEventFromDate,
                    to:fossEventToDate
                })
                .expect(201)
                .end(function (err, res) {
                    if (err) return done(err);
                    Event.findById(res._id, function (err, event) {
                        if (err) done(err);
                    });
                    done();
                });
        });

    });

    describe( 'Event Deletion Operations', function () {
        /* Design Unique ID: 2629*/
        it('Delete an existing event', function (done) {
            request(app)
                .delete('/events/'+eventId1)/*Note: Does this provide all course rounds or a certain course rounds? Not reflected
             in design*/
                .expect(204)
                .end(function (err, res) {
                    if (err) return done(err);
                    Event.findById(res._id, function (err, event) {
                    should.not.exist(event);
                    });
                    done();
                });
        });
        /* Design Unique ID: 2629*/
        it('Delete inexistent event', function (done) {
            request(app)
                .delete('/events')/*Note: Does this provide all course rounds or a certain course rounds? Not reflected
             in design*/
                .send({
                    id: '53fbf4615c3b9f41c381b6a3'
                })
                .expect(404)
                .end(function (err, res) {
                    if (err) return done(err);
                    done();
                });
        });

    });

    describe( 'Event Update Operations', function () {
        /* Design Unique ID: 2628*/
        it('Should update an existing event', function (done) {
            request(app)
                .put('/events')
                .send({
                    title: 'Practical SOA',
                    description: 'This is a practical course',
                    cost: 1500,
                    from:soaConsultationFromDate,
                    to:soaConsultationCourseToDate,
                    _id: eventId1
                })
                .expect(200)//Ok
                .end(function (err, res) {
                    if (err) return done(err);
                    done();
                });
        });
        /* Design Unique ID: 2628*/
        it('Update un-existent event', function (done) {
            request(app)
                .put('/events')/*Note: Does this provide all course rounds or a certain course rounds? Not reflected
             in design*/
                .send({
                    title: 'Practical SOA',
                    description: 'This is a practical course',
                    cost: 1500,
                    from:soaConsultationFromDate,
                    to:soaConsultationCourseToDate,
                    _id: '53fbf4615c3b9f41c381b6a3'
                })
                .expect(404)
                .end(function (err, res) {
                    if (err) return done(err);
                    done();
                });
        });

    });
});

