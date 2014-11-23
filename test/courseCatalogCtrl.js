var app = require('./helper/app.js');
var request = require('supertest');
var should=require('should');
describe('Course Catalog API', function(){
	 it('Should return course rounds in form of eventList of courseId', function(done){
	    request(app)
	      .get('/course/rounds')
	      .expect(200)
	      .end(function(err, res){
				if (err) return done(err);
				res.body.eventList.should.not.equal(undefined);

				done();
	      });
	  });
	  
	  it('should create new course request and return success', function(done){
		    request(app)
		      .post('/course/registerToRound')
		      .send({userEmail: 'mugamal@itida.gov.eg',
		      eventId:'1234'})
		      .expect(200)
		      .end(function(err, res){
		        if (err) return done(err);
		        done();
		      });
		  });
	});