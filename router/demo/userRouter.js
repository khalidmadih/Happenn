const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const router = express.Router();
const jsonParser = require('body-parser').json();
const {User} = require('../../models/users');
const {Event} = require('../../models/events')


router.use(jsonParser);
router.use(passport.initialize());


router.put('/:eventId', (req, res) => {
	let eventId = req.params.eventId;
	
	return User
		.findOneAndUpdate({username: req.body.username},
		{
			$push: {
				'eventsRsvp': eventId
			}
		})
		.exec()
		.then(user => {
			Event
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

router.post('/:user', (req, res) => {
	return User
		.create({
			username: req.body.username,
			password: req.body.password,
			nickname: req.body.nickname
		})
		.then(user => {
			res.status(201).json(user);
		}
		)
		.catch(err => {
			/* istanbul ignore next */
			console.log("User create error")
		})
});

/* Feature coming soon */
router.get('/profile/:username', (req, res) => {
	/* istanbul ignore next */
	let username = 'demo';
	/* istanbul ignore next */
	return User
		.findOne({username: username})
		.populate('eventsRsvp')  
		.populate('eventsCreated')
		.exec()
		.then(user => {
			/* istanbul ignore next */
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

router.get('/allUser', (req, res) => {
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

router.delete('/cancelRsvp/:eventId', (req, res) => {
	let eventId = req.params.eventId;

	return User
		.findOneAndUpdate({username: req.body.username}, 
		{
			$pull: {
				'eventsRsvp': eventId
			}
		})
		.exec() 
		.then(user => {
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
		})
		.catch(err => {
			/* istanbul ignore next */
			console.log("Error when updating event to the account.", err);
		});				
})

router.delete('/cancelEvent/:eventId', (req, res) => {
	let eventId = req.params.eventId;

	return Event
		.findByIdAndRemove(eventId)
		.exec()
		.then(event => {
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
		}) 
		.catch(err => {
			/* istanbul ignore next */
			res.status(500).json({message: 'Internal Error Message'})
		})
})


module.exports = router
