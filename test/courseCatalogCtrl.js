var app = require('./helper/app.js');
var request = require('supertest');
describe('GET /course/newRound', function(){
	  it('respond with json', function(done){
	    request(app)
	      .get('/course/newRound')
	      .expect(200)
	      .end(function(err, res){
	        if (err) return done(err);
	        done();
	      });
	  });
	  
	  it('respond with json', function(done){
		    request(app)
		      .get('/course/newRound')
		      .expect(200)
		      .end(function(err, res){
		        if (err) return done(err);
		        done();
		      });
		  });
	});