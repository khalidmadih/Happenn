// Requiring modules

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const router = express.Router();
const jsonParser = require('body-parser').json();
const {User} = require('../models/users');
const {Event} = require('../models/events');



router.use(jsonParser);
router.use(passport.initialize());

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;


// New Google Strategy and passing API credentials
passport.use(new GoogleStrategy({
	clientID: '859169000889-l85bfaadbm1oe5b0eoql9df5f60piqc3.apps.googleusercontent.com',
	clientSecret: 'p4BYNOBgv-jEjFLTd13NfTaZ',
	callbackURL: '/api/user/auth/google/callback'
}, function(accessToken, refreshToken, profile, done) {
	return User
		.findOrCreate({
			username: profile.id
		}, 
		{
			password: accessToken,
			nickname: profile.displayName
		}, (err, user) => {
			
			return done(null, user);
		})
}));

// New Bearer Strategy 
passport.use(new BearerStrategy(function(token, done) {
	User.findOne({password: token}, function(err, user) {
		if (err) return done(err);
		
		if (!user) return done(null, false);
		
		return done(null, user, {scope: 'all'});
	});
}));


router.get('/auth/google', passport.authenticate('google', {scope: ['email profile']}));


router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: 'login', session: false}),
	function(req, res) {
		res.cookie('accessToken', req.user.password, { expires: 0 });
		res.redirect('/#/app/home')
});


// router.get('/auth/facebook',
//   passport.authenticate('facebook', {scope: ['email']}));

// router.get('/auth/facebook/callback',
//   passport.authenticate('facebook', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/#/app/home');
//   });


router.get('/auth/logout', (req, res) => {
  req.logout();
  res.clearCookie('accessToken');
  res.redirect('/');
});

// RSVP an event
router.put('/:eventId', passport.authenticate('bearer', {session: false}), (req, res) => {
	let eventId = req.params.eventId;
	/* TODO - If event exist, then prevent to rsvp again */
	return User
		.findOneAndUpdate({username: req.user.username}, // Production using req.user.username
		{
			$push: {
				'eventsRsvp': eventId
			}
		})
		.exec() // Need to know what happen if no exec()
		.then(user => {
			return Event
				.findOne({_id: eventId})
				.exec()
				.then(event => {
					event.numberOfRsvp += 1;
					event.save();
				})
				
			res.json(user);
		})
		.catch(err => {
			/* istanbul ignore next */
			console.log("Error when updating event to the account.", err);
		});				
});

// Get the user profile
router.get('/profile/:username', passport.authenticate('bearer', {session: false}), (req, res) => {
	/* istanbul ignore next */
	let username = req.user.username;

	return User
		.findOne({username: username})
		.populate('eventsRsvp')  
		.populate('eventsCreated')
		.exec()
		.then(user => {
			res.status(200).json({
				username: user.username,
				nickname: user.nickname,
				eventsRsvp: user.eventsRsvp,
				eventsCreated: user.eventsCreated
			})
		})
		.catch(err => {
			/* istanbul ignore next */
			console.log(err);
		})
})

// Get the user profile
router.get('/getRsvpProfile', passport.authenticate('bearer', {session: false}), (req, res) => {
	/* istanbul ignore next */
	let username = req.user.username;

	return User
		.findOne({username: username})
		.populate('eventsRsvp')  
		.exec()
		.then(user => {
			res.status(200).json({
				eventsRsvp: user.eventsRsvp,
			})
		})
		.catch(err => {
			/* istanbul ignore next */
			console.log(err);
		})
})

/* TEST ONLY */
router.get('/allUser', passport.authenticate('bearer', {session: false}), (req, res) => {
	return User
		.find({})
		.exec()
		.then(user => {
			res.status(200).json(user);
		})
		.catch(err => {
			/* istanbul ignore next */
			console.log(err);
		})
});

// Cancel a RSVP event
router.delete('/cancelRsvp/:eventId', passport.authenticate('bearer', {session: false}), (req, res) => {
	let eventId = req.params.eventId;

	return User
		.findOneAndUpdate({username: req.user.username}, // Production using req.user.username
		{
			$pull: {
				'eventsRsvp': eventId
			}
		})
		.exec() // Need to know what happen if no exec()
		.then(user => {
			return User
				.findOne({ username: req.user.username })
				.populate('eventsRsvp')  
				.populate('eventsCreated')
				.exec()
				.then(user => {
					res.status(200).json({
						username: user.username,
						nickname: user.nickname,
						eventsRsvp: user.eventsRsvp,
						eventsCreated: user.eventsCreated
					})
				})
				.catch(err => {
					/* istanbul ignore next */
					console.log(err);
				})
		})
		.catch(err => {
			/* istanbul ignore next */
			console.log("Error when updating event to the account.", err);
		});				
})

// Cancel an event
router.delete('/cancelEvent/:eventId', passport.authenticate('bearer', {session: false}), (req, res) => {
	let eventId = req.params.eventId;

	return Event
		.findByIdAndRemove(eventId)
		.exec()
		.then(event => {
			// Return back the rest of the data
			return User
				.findOne({ username: req.user.username })
				.populate('eventsRsvp')  
				.populate('eventsCreated')
				.exec()
				.then(user => {
					res.status(200).json({
						username: user.username,
						nickname: user.nickname,
						eventsRsvp: user.eventsRsvp,
						eventsCreated: user.eventsCreated
					})
				})
				.catch(err => {
					/* istanbul ignore next */
					console.log(err);
				})

		})
		.catch(err => res.status(500).json({message: 'Internal Error Message'}))
})



// Furture features
// // Get the users event. The info will be public so does not need use passport. 
// router.get('/:username', (req, res) => {
// 	// Return the user that corresponds to /:username
// });

// // Update the user's information
// router.put('/:username', passport.authenticate('bearer', {session: false}), (req, res) => {
// 	// Find the user
// });

module.exports = router
