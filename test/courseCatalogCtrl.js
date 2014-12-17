var app = require('./helper/app.js');
var request = require('supertest');
var should = require('should');

var moment=require('moment');

var mongoose = require('mongoose');
var mockgoose = require('mockgoose');

var Model = require('../server/model/cmsModel');
mockgoose(mongoose);
var Event = mongoose.model('Event'),
    Course = mongoose.model('Course'),
    User = mongoose.model('User');
var eventId1, eventId2,
    userId,soaCourse,archCourse,soaCourseId,archCourseId;
var courseFromDate= moment(['2015','01','20']);
var courseToDate= moment(['2015','01','22']);
var soaCourseFromDate= moment(['2015','02','30']);
var soaCourseToDate= moment(['2015','03','01']);
var archCourseFromDate= new Date('2015','02','20');
var archCourseToDate= new Date('2015','02','22');
describe('Course Catalog Operations', function () {
    soaCourse='Practical SOA';
    archCourse='SW Arch';
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
                title: soaCourse,
                description: 'This is a practical course',
                from:soaCourseFromDate,
                to:soaCourseToDate,
                cost: 1500,
                refId:"SoaCode"
            },
                {
                    title: archCourse,
                    description: 'This is a practical course',
                    from:archCourseFromDate,
                    to:archCourseToDate,
                    cost: 1500,
                    users: [userId]
                }], function (err, event1, event2) {
                if (err) done(err);
                eventId1 = event1._id;
                eventId2 = event2._id;
            })

        }).then(function () {

                Course.create([
                    {
                        code:'ArchCode',
                        title: archCourse,
                        description: 'This is a practical Arch course'
                    },
                    {
                        code:'SoaCode',
                        title: soaCourse,
                        description: 'This is a practical SOA course'
                    }],function (err, model, model2) {
                    if (err) done(err);
                    soaCourseId  =model2._id;
                    archCourseId =  model._id;
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

    describe('Course Registration Operation', function () {

        it('Should register a subscriber to a course and return success', function (done) {
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

        it('Should fail to register a course subscriber that was previously subscribed', function (done) {
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



    describe('Course Listing Operations"', function () {

/*2604*/
        it('Should return a list of all courses', function (done) {
            request(app)
                .get('/courses')
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    res.body.should.hasOwnProperty("courseList").not.equal(undefined);
                    res.body.courseList[0].should.hasOwnProperty("title").equal(archCourse);
                    res.body.courseList[1].should.hasOwnProperty("title").equal(soaCourse);
                    done();
                });
        });
    });

    describe('Course Addition Operations', function () {

        /*2605*/
        it('Should add a new course', function (done) {
            request(app)
                .post('/courses')
                .send({
                    code: 'AgileCode',
                    title: 'Agile Course',
                    description:'This is an Agile Course',
                    cost:'1500 L.E'
                })
                .expect(201)//Created
                .end(function (err, res) {
                    if (err) return done(err);
                    res.body.hasOwnProperty('id');
                    done();
                });
        });



    });
    describe('Course Update operation', function () {
        /*2606*/
        it('Should update an existing course', function (done) {
            request(app)
                .put('/courses')
                .send({
                    id: archCourseId,
                    code: 'ArchCode',
                    title: 'Arch Code Update',
                    description:'This is an Arch Code update',
                    cost:'1500 L.E'
                })
                .expect(200)//Ok
                .end(function (err, res) {
                    if (err) return done(err);
                    done();
                });
        });
        /*2606*/
        it('Try to update a non existing course', function (done) {
            request(app)
                .put('/courses')
                .send({
                    code: 'InExistentCode',
                    title: 'Updating InExistent Code',
                    description:'This should not be processed',
                    cost:'1500 L.E'
                })
                .expect(404)//NOT FOUND
                .end(function (err, res) {
                    if (err) return done(err);
                    done();
                });
        });
    });

    describe('Course Delete operation', function () {
/*2607*/
        it('Try to delete an existing course', function (done) {
            request(app)
                .delete('/courses')
                .send({
                    id: soaCourseId
                })
                .expect(204)//No Content
                .end(function (err, res) {
                    if (err) return done(err);
                    Course.findById(soaCourseId,function(err, course){
                        should.not.exist(course);
                        done();
                    });
                });
        });
/*2607*/
        it('Try to delete a non existing course', function (done) {
            request(app)
                .delete('/courses')
                .send({
                    _id: eventId1//Added as a random Id intentionally
                })
                .expect(404)//NOT FOUND
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
                    var fromDif = from.diff(archCourseFromDate);//.should.equalDate.
                    var to=moment(res.body.event.to);
                    var toDif = to.diff(archCourseToDate);//.should.equalDate.
                    res.body.id.should.equal(archCourseId);
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
                    _id: eventId1//Added as a random Id intentionally
                })
                .expect(404)//NOT FOUND
                .end(function (err, res) {
                    if (err) return done(err);
                    done();
                });
        });
    });

});
