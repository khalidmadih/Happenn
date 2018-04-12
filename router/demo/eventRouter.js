const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const router = express.Router();
const jsonParser = require('body-parser').json();
const {Event} = require('../../models/events');
const {User} = require('../../models/users');

router.use(jsonParser);
router.use(passport.initialize());


router.get('/all', (req, res) => {
	return Event
		.find({}, (err, events) => {
			res.status(200).json(events);
		});
});

router.put('/updatePositive', (req, res) => {
	// console.log("ID", req.body.eventId)
	return Event
		.findOne({_id: req.body.eventId})
		.exec()
		.then(event => {
			// console.log("BePOSTIVE", event)
			event.expectedPositive += 1;
			event.save().then(function(event) {
				return User
					.findOne({username: req.body.username})
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

router.put('/updateNegative', (req, res) => {
	return Event
		.findOne({_id: req.body.eventId})
		.exec()
		.then(event => {
			event.expectedNegative += 1;
			event.save().then(function(event) {
				return User
					.findOne({username: req.body.username})
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
router.put('/postComment', (req, res) => {
	return Event
		.findOne({_id: req.body.eventId})
		.exec()
		.then(event => {
			event.comments.push(req.body.comment);
			event.save().then(function(event) {
				return User
					.findOne({username: req.body.username})
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

router.post('/', (req, res) => {
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
			return User
				.findOneAndUpdate({username: 'demo'},
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


module.exports = router