const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const should = chai.should();
const {TEST_DATABASE_URL} = require('../config');
const {Event} = require('../models/events');
const {User} = require('../models/users');


chai.use(chaiHttp);

mongoose.Promise = global.Promise;

function seedUserData() {

	console.log("Seeding User Data...")
	const data = [];

	for (let i = 1; i <= 5; i++) {
		data.push(generateUser());
	}

	// console.log(data)

	return User.insertMany(data)
}

// Or use object literal to pass the function

function generateUsername() {
	const username = [
		'user1', 'usesr2', 'user3', 'user4', 'user5'];
	return username[Math.floor(Math.random() * username.length)];
}

function generatePassword() {
	const password = ['123', '321', '567'];
	return password[Math.floor(Math.random() * password.length)]
}

function generateNickname() {
	const nickname = [
		'David', 'Owen', 'Peter', 'Joe', 'Kevin'];
	return nickname[Math.floor(Math.random() * nickname.length)];
}

function generateEventId() {
	// Create and store real id. Create an event and get the id from mongoose
	// Use that and create an object that contains all this information.
	const id = ["123", "321", "567", "765", "678"];
	return id[Math.floor(Math.random() * id.length)];
}

function generateEventsCreated() {
	const created = [];
	for (let i = 1; i <= 5; i++) {
		created.push(generateEventId())
	}

	return created;
}

function generateEventsRsvp() {
	const rsvp = [];
	for (let i = 1; i <= 3; i++) {
		rsvp.push(generateEventId())
	}

	return rsvp;
}

// How to test with schema?
function generateUser() {
	return {
		username: generateUsername(),
		password: generatePassword(),
		nickname: generateNickname(),
		eventsCreated: [],//generateEventsCreated(),
		eventsRsvp: []//generateEventsRsvp()
	}
}

function seedEventData() {

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

describe('User', function() {
	before(function() {
		return connectDB();
	});

	beforeEach(function() {
		return seedUserData();
	})

	afterEach(function() {
		return tearDownDb();
	})

	after(function() {
		return closeDB();
	});

	describe('Call getUserInfo', function() {
		it('should return user basic info', function() {
			return User
				.findOne({})
				.exec()
				.then(res => {
					res.getUserInfo().should.be.a('object');
					res.getUserInfo().username.should.equal(res.username);
					res.getUserInfo().id.should.equal(res.id);
					res.getUserInfo().nickname.should.equal(res.nickname);
				});
		});
	});

	describe('Call getUserEvents', function() {
		it('should return user event info', function() {
			return User
				.findOne({})
				.exec()
				.then(res => {
					res.getUserEvents().should.be.a('object');

					// TODO - Need to add more test case by creating Event and User object
				});
		});
	});	
});

describe('Event', function() {
	before(function() {
		return connectDB();
	});

	beforeEach(function() {
		return seedEventData();
	})

	afterEach(function() {
		return tearDownDb();
	})

	after(function() {
		return closeDB();
	});

	describe('Get apiRepr', function() {
		it('should return an event object', function() {
			// Why apiRepr() is not a function???
			// If it is static, then we can use Event directly.
			return Event.findOne({}).exec().then(res => {
				// console.log("apiRepr", res.apiRepr().location);
				// console.log("res", res.name)
				res.apiRepr().should.be.a('object');
				res.apiRepr().name.should.equal(res.name);
				res.apiRepr().location.should.equal(res.location);
				res.apiRepr().price.should.equal(res.price);
				res.apiRepr().tag.should.equal(res.tag);
				res.apiRepr().description.should.equal(res.description);													
			});
		});
	});
});

function tearDownDB() {
	return mongoose.connection.dropDatabase();
}

function connectDB() {
	return mongoose.connect(TEST_DATABASE_URL);
}

function closeDB() {
	return mongoose.disconnect();
}