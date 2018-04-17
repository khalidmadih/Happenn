const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const router = express.Router();
const jsonParser = require('body-parser').json();
const {Event} = require('../models/events');
const {User} = require('../models/users');

router.use(jsonParser);
router.use(passport.initialize());

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;


passport.use(new BearerStrategy(function(token, done) {
	User.findOne({password: token}, function(err, user) {
		if (err) return done(err);
		// Need to find out why false
		if (!user) return done(null, false);
		// Need to find out how
		return done(null, user, {scope: 'all'});
	});
}));


router.get('/all', passport.authenticate('bearer', {session: false}), (req, res) => {
	// Get all events
	// Return all events here
	// Use MongoDB query to return all events
	return Event
		.find({}, (err, events) => {
			res.status(200).json(events);
		});
});

router.put('/updatePositive', passport.authenticate('bearer', {session: false}), (req, res) => {
	// console.log("ID", req.body.eventId)
	return Event
		.findOne({_id: req.body.eventId})
		.exec()
		.then(event => {
			// console.log("BePOSTIVE", event)
			event.expectedPositive += 1;
			event.save().then(function(event) {
				return User
					.findOne({username: req.user.username})
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
			});
		})
});

router.put('/updateNegative', passport.authenticate('bearer', {session: false}), (req, res) => {
	return Event
		.findOne({_id: req.body.eventId})
		.exec()
		.then(event => {
			event.expectedNegative += 1;
			event.save().then(function(event) {
				return User
					.findOne({username: req.user.username})
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
			});
		})
});

// TODO - Need to put at userRouter
router.put('/postComment', passport.authenticate('bearer', {session: false}), (req, res) => {
	return Event
		.findOne({_id: req.body.eventId})
		.exec()
		.then(event => {
			event.comments.push(req.body.comment);
			event.save().then(function(event) {
				return User
					.findOne({username: req.user.username})
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
			});
		})
});

// User should be able to post an event
router.post('/', passport.authenticate('bearer', {session: false}), (req, res) => {
	return Event
		.create({
			name: req.body.name,
			location: req.body.location,
			time: req.body.time,
			description: req.body.description,
			tag: req.body.tag,
			price: req.body.price
		})
		.then(event => {
			// Chain to the user
			return User
				.findOneAndUpdate({username: req.user.username}, // Production using req.user.username
				{
					$push: {
						'eventsCreated': event._id
					}
				})
				.exec() // Need to know what happen if no exec()
				.then(user => {
					res.status(201).json(event); // user?
				})
				.catch(err => {
					/* istanbul ignore next */
					console.log("Error when updating event to the account.", err);
				});
		})
		.catch(err => {
			/* istanbul ignore next */
			console.log("Error when creating an event.", err);
		})
});


// Future Features
// User should be able to update an event
// router.put('/:eventId', passport.authenticate('bearer', {session: false}), (req, res) => {
// 	// 1. Find the event with the given event Id
// 	// 2. Update the event's information
// });
// // User should be able to delete an event
// router.delete('/:eventId', passport.authenticate('bearer', {session: false}), (req, res) => {
// 	// Delete a event with the given eventId
// 	// 1. Find the event
// 	// 2. Delete the event
// });

module.exports = router