const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const {app, runServer, closeServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config');
const {User} = require('../models/users');
const {Event} = require('../models/events');
// Syntax of Chai - should
const should = chai.should();
const expect = chai.expect;

// Make HTTP requests using chai
chai.use(chaiHttp);

mongoose.Promise = global.Promise;


describe('Musico React Server Test', function() {

	// We need to activate runServer before our thest run. 
	// In order to avoid race condition that our test might 
	// start running before the server has started, we need
	// return a promise here. So that why we use return runServer()
	before(function() {
		return runServer(TEST_DATABASE_URL);
	});

	// We need to close our server after this test is finished.
	// Otherwise, it may cause some error if we add another test
	// module that has 'before' block.
	after(function() {
		return closeServer();
	});


	describe('GET endpoint', function() {
		it('should go to index page', function() {
			return chai.request(app)
				.get('/')
				.then(function(res) {
					// Current version of Chai treat 301 as an error and 
					// will return 200 as response
					// https://github.com/chaijs/chai-http/issues/10
					res.should.have.status(200);
				});
		});
	});
});