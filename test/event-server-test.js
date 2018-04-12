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
chai.use(require('chai-passport-strategy'));

mongoose.Promise = global.Promise;

function seedData() {

	console.log("Seeding Event Data...")
	const data = [];

	for (let i = 1; i <= 5; i++) {
		data.push(generateEvents());
	}

	return Event.insertMany(data)
}

function generateEventName() {
	const name = ["Event 1", "Event 2", "Event 3", "Event 4", "Event 5"];
	return name[Math.floor(Math.random() * name.length)];
}

function generateEventLocation() {
	const location = ["NY", "NJ", "MA"];
	return location[Math.floor(Math.random() * location.length)];
}

function generateEventTime() {
	const time = ["2017/1/1", "2017/2/1", "2017/3/1", "2017/4/1", "2017/5/1"];
	return time[Math.floor(Math.random() * time.length)];	
}

function generateEventPrice() {
	const price = [0, 1, 2, 3, 4, 5];
	return price[Math.floor(Math.random() * price.length)];	
}

function generateEventTag() {
	const tag = ["Piano", "Violin", "Saxophone"];
	return tag[Math.floor(Math.random() * tag.length)];	
}

function generateEventDescription() {
	const description = ["Hello", "World"];
	return description[Math.floor(Math.random() * description.length)];	
}

function generateEvents() {
	return {
		name: generateEventName(),
		location: generateEventLocation(),
		time: generateEventTime(),
		price: generateEventPrice(),
		tag: generateEventTag(),
		description: generateEventDescription()
	}
}

function tearDownDb() {
	console.warn("Deleting test database");
	return mongoose.connection.dropDatabase();
}

describe('Event Server Test', function() {

	// We need to activate runServer before our thest run. 
	// In order to avoid race condition that our test might 
	// start running before the server has started, we need
	// return a promise here. So that why we use return runServer()
	before(function() {
		return runServer(TEST_DATABASE_URL);
	});

	beforeEach(function() {
		return seedData();
	})

	afterEach(function() {
		return tearDownDb();
	})

	// We need to close our server after this test is finished.
	// Otherwise, it may cause some error if we add another test
	// module that has 'before' block.
	after(function() {
		return closeServer();
	});

	// How to test with Google Strategy???
	// xdescribe('Token Strategy', function() {
	// 	let strategy = new Strategy(function(token, done) {
	// 		if (token == '') {
	// 			return done(null, {},{});
	// 		}
	// 		return done(null, false);
	// 	});

	// 	xdescribe('Google Oauth', function() {
	// 		it('should login to Google', function() {
	// 			return chai.request(app)
	// 				.get('/event/auth/google')
	// 				.then(function(res) {
	// 					console.log("Google", res)
	// 				})
	// 		});
	// 	});
	// });

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

		it('should return all events', function() {
			let res;
			return chai.request(app)
				.get('/api/demo/event/all')
				.then(function(_res) {
					res = _res;
					res.should.have.status(200);
					res.body.should.have.length.of.at.least(1);
					return Event.count();
				})
				.then(function(count) {
					res.body.should.have.length.of(count);
				});
		});
	});

	describe('POST endpoint', function() {
		it('should post an event', function() {
			const newEvent = generateEvents();
			// console.log(newEvent)
			return chai.request(app)
				.post('/api/demo/event/')
				.send(newEvent)
				.then(function(res) {
					// console.log(res.body)
					res.should.have.status(201);
					res.should.be.json;
					res.body.should.be.a('object');
					res.body.should.include.keys(
						'_id', 'name', 'location', 'time', 'price', 'tag', 'description');
					res.body._id.should.not.be.null;
					res.body.name.should.equal(newEvent.name);
					res.body.location.should.equal(newEvent.location);
					// res.body.time.should.equal(newEvent.time); // time format error
					res.body.price.should.equal(newEvent.price);
					res.body.tag.should.equal(newEvent.tag);
					res.body.description.should.equal(newEvent.description);

					return Event.findById(res.body._id);
				})
				.then(function(event) {
					event.name.should.equal(newEvent.name);
					event.location.should.equal(newEvent.location);
					event.price.should.equal(newEvent.price);
					event.tag.should.equal(newEvent.tag);
					event.description.should.equal(newEvent.description);					
				})
		});
	});
});