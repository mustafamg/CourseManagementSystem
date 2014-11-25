var app = require('./helper/app.js');
var request = require('supertest');
var should = require('should');

var mongoose = require('mongoose');
var mockgoose = require('mockgoose');
var Model = require('../server/model/cmsModel');
mockgoose(mongoose);


describe('Course Catalog API', function () {
    var Event = mongoose.model('Event'),
        User = mongoose.model('User');
    var eventId1, eventId2,
        userId;

    before(prepareDataForTest);
    function prepareDataForTest(done) {
        mockgoose.reset();
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
                cost: 1500
            },
                {
                    title: 'SW Arch',
                    description: 'This is a practical course',
                    cost: 1500,
                    users: [userId]
                }], function (err, event1,event2) {
                if (err) done(err);
                eventId1 = event1._id;
                eventId2 = event2._id;
            })
        }).then(function () {
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

    it('Should return course rounds in form of eventList of courseId', function (done) {
        request(app)
            .get('/course/rounds')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                res.body.eventList.should.not.equal(undefined);
                done();
            });
    });

    it('should create new course request and return success', function (done) {
        request(app)
            .post('/course/registerToRound')
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

    it('should fail to create new course request that was created before', function (done) {
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
///////////////////////////////////////Start from here///////////////////////////
    it('should give user not found for unregistered user email', function (done) {
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


	it('should give event not found for registered user email', function (done) {
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