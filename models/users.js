const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const findOrCreate = require('mongoose-find-or-create');


const UserSchema = Schema({
	username: {
		type: String,
		require: true
	},
	password: {
		type: String,
		require: true
	},
	token: {
		type: String
	},
	nickname: {
		type: String,
		require: true
	},
	eventsCreated: [{
		type: Schema.Types.ObjectId,
		ref: 'Event'
	}],	
	eventsRsvp: [{
		type: Schema.Types.ObjectId,
		ref: 'Event'
	}]
	// Future feature
	// eventsInterested: {
	// }
});

UserSchema.plugin(findOrCreate);

// Use methods becuase why need to research later and difference between
// other call or methods function - static
UserSchema.methods.getUserInfo = function() {
	return {
		id: this.id,
		username: this.username,
		nickname: this.nickname,
	}
}

UserSchema.methods.getUserEvents = function() {
	return {
		id: this.id,
		events: this.events
	}
}

const User = mongoose.model('User', UserSchema);

// When to use {} when to not use?
module.exports = {User}