const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EventSchema = Schema({
	name : {
		type: String,
		require: true
	},
	location: {
		type: String,
		require: true
	},
	time: {
		type: Date,
		require: true
	},
	price: {
		type: Number,
		default: 0
	} ,
	tag: {
		type: String,
		require: true
	},
	description : {
		type: String
	},
	createdBy: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	numberOfRsvp: {
		type: Number,
		default: 0
	},
	expectedPositive: {
		type: Number,
		default: 0
	},
	expectedNegative: {
		type: Number,
		default: 0
	},
	comments: {
		type: [String]
	}
	// Future feature
	// image: {
	// 	type: 
	// }
});

EventSchema.methods.apiRepr = function() {
	return {
		id: this.id,
		name: this.name,
		location: this.location,
		time: this.time,
		description: this.description,
		price: this.price,
		tag: this.tag
		// image: this.image
	}
}

const Event = mongoose.model('Event', EventSchema)

module.exports = {Event}