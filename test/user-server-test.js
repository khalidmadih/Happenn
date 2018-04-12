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


function seedData() {
  const data = [];

  for (let i = 0; i <= 4; i++) {
    data.push(generateData());
  }

  return User.insertMany(data);
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
  const time = ["2017/1/1, 6:00 AM", "2017/2/1, 6:00 AM", "2017/3/1, 6:00 AM", "2017/4/1, 6:00 AM", "2017/5/1, 6:00 AM"];
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
function generateData() {
  return {
    username: generateUsername(),
    password: generatePassword(),
    nickname: generateNickname(),
    // eventsCreated: [],//generateEventsCreated(),
    // eventsRsvp: [] //generateEventsRsvp()
  }
}

function tearDownDb() {
  console.warn("Deleting test database");
  return mongoose.connection.dropDatabase();
}

describe('User Server Test', function() {

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


  describe('GET endpoint', function() {
    it('should return list of users', function() {
      let res;
      return chai.request(app)
        .get('/api/demo/user/allUser')
        .then(function(_res) {
          res = _res;
          // Get all users
          // console.log(res.body)
          res.should.have.status(200);
          res.body.should.have.length.of.at.least(1);
          return User.count();
        })
        .then(function(count) {
          res.body.should.have.length.of(count);
        })
    });   
  });

  describe('POST endpoint', function() {
    it('should create an user', function() {
      const newUser = generateData();

      return chai.request(app)
        .post('/api/demo/user/'+newUser.username)
        .send(newUser)
        .then(function(res) {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.include.keys(
            'username', 'password', 'nickname', 'eventsCreated', 'eventsRsvp');
          res.body.username.should.equal(newUser.username);
          res.body.password.should.equal(newUser.password);
          res.body.nickname.should.equal(newUser.nickname);
          res.body.eventsCreated.should.be.a('array');
          res.body.eventsRsvp.should.be.a('array');
        })
    });
  });

  describe('PUT endpoint', function() {
    /*
    Test RSVP:
    1. Clean the Test Database to avoid same property name conflict updating, which may cause updating the wrong object
    2. Use return and create a new User
    3. Create a new Event after the new User is created
    4. Find and update the object to the User just created using find by _id
    5. Once it is updated, we can use chai.request to do the test

    */
    it('should rsvp an event', function() {
      tearDownDb();
      let user;
      let event;
      return User
        .create(generateData())
        .then(_user => {
          user = _user;
          // console.log("+_+Create User: ", user)
          return Event
            .create(generateEvents())
            .then(_event => {
              event = _event;
              // console.log("===Event Id: ", event._id)
              return User
                .findOneAndUpdate({_id: user._id}, // Production using req.user.username
                {
                  $push: {
                    'eventsRsvp': event._id
                  }
                })
                .exec() // Need to know what happen if no exec()
                .then(res2 => {
                  // console.log("+++ Updated User: ", res2)
                  return chai.request(app)
                    .put('/api/demo/user/'+ event._id)
                    .send(user)
                    .then(function(res) {
                      // console.log("FINAL: ", res.body)
                      res.should.be.a('object');    
                      res.body.eventsRsvp.should.be.a('array'); 
                      res.body.eventsRsvp[0].should.equal(''+event._id);    
                      // res.something.should.equal user.eventRsvp[0]         
                    });
                })    
                .catch(err => {
                  console.log(err);
                });       
            })
            .catch(err => {
              console.log(err);   
            });
        })
        .catch(err => {
          console.log(err);       
        }); 
    });
  });

  describe('DELETE endpoint', function() {
    it('should delete an event from rsvp', function() {
      tearDownDb();
      let user;
      let event;
      return User
        .create(generateData())
        .then(_user => {
          user = _user;
          return Event
            .create(generateEvents())
            .then(_event => {
              event = _event;
              return User
                .findOneAndUpdate({_id: user._id},
                {
                  $push: {
                    'eventsRsvp': event._id
                  }
                })
                .exec() 
                .then(res => {
                  return chai.request(app)
                    .delete('/api/demo/user/cancelRsvp/'+ event._id)
                    .send(user)
                    .then(function(res) {
                      // console.log("RES", res.body)
                      res.should.be.an('object');   
                      res.body.eventsRsvp.should.be.an('array');
                      /* Why still pass if change to 1? Maybe promise? */
                      res.body.eventsRsvp.should.have.length.of(0);       
                    });
                })    
                .catch(err => { // Maybe here?
                  console.log(err);
                });       
            })
            .catch(err => {
              console.log(err);   
            });
        })
        .catch(err => {
          console.log(err);       
        }); 
    });
  });

  describe('DELETE endpoint', function() {
    it('should delete an event from created', function() {
      tearDownDb();
      let user;
      let event;
      return User
        .create(generateData())
        .then(_user => {
          user = _user;
          return Event
            .create(generateEvents())
            .then(_event => {
              event = _event;
              return User
                .findOneAndUpdate({_id: user._id},
                {
                  $push: {
                    'eventsCreated': event._id
                  }
                })
                .exec() 
                .then(res => {
                  return chai.request(app)
                    .delete('/api/demo/user/cancelEvent/'+ event._id)
                    .send(user)
                    .then(function(res) {
                      // console.log("RES", res.body)
                      res.should.be.a('object');    
                      res.body.eventsCreated.should.be.a('array');
                      res.body.eventsCreated.should.have.length.of(0);                            
                    });
                })    
                .catch(err => {
                  console.log(err);
                });       
            })
            .catch(err => {
              console.log(err);   
            });
        })
        .catch(err => {
          console.log(err);       
        }); 
    });
  });   
});