const receiveRegisterUser = (user) => ({
	type: 'RECEIVE_REGISTER_USER',
	user
})

const receivePostEvent = (event) => {
	return {
		type: 'RECEIVE_POST_EVENT',
		event
	}
}

const receiveUserRsvpEvents = (events) => {
	return {
		type: 'RECEIVE_USER_RSVP_EVENTS',
		events
	}
}

const receiveRsvpEvent = (event) => ({
	type: 'RECEIVE_RSVP_EVENT',
	event
})

const receiveUserProfileFromAPI = (user) => {
	return {
		type: 'RECEIVE_USER_PROFILE',
		user
	}
}

const receiveAllEventsDataFromAPI = (events) => {
	return {
	type: 'RECEIVE_ALL_EVENTS',
	events
	}
}

const receiveCancelRsvp = (user) => {
	return {
		type: 'RECEIVE_CANCEL_RSVP',
		user
	}
}

const receiveCancelEvent = (user) => {
	return {
		type: 'RECEIVE_CANCEL_EVENT',
		user
	}
}

const receiveToken = (token) => {
	return {
		type: 'RECEIVE_TOKEN',
		token
	}
}

const receivePositive = (user) => {
	return {
		type: 'RECEIVE_POSITIVE',
		user
	}
}

const receiveNegative = (user) => {
	return {
		type: 'RECEIVE_NEGATIVE',
		user
	}
}

const receiveComment = (user) => {
	return {
		type: 'RECEIVE_COMMENT',
		user
	}
}

export const positiveExpectation = (event) => {
	return dispatch => {
		fetch('/api/demo/event/updatePositive', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: 
				JSON.stringify({
				eventId: event,
				username: 'demo'
			})
		})
		.then(response => response.json())
		.then(user => dispatch(receivePositive(user)))
	}
}

export const negativeExpectation = (event) => {
	return dispatch => {
		fetch('/api/demo/event/updateNegative', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: 
				JSON.stringify({
				eventId: event,
				username: 'demo'
			})			
		})
		.then(response => response.json())
		.then(user => dispatch(receiveNegative(user)))
	}	
}

export const displayCommentForm = (eventId, eventTitle) => {
	return {
		type: 'REQUEST_COMMENT_FORM',
		eventId,
		eventTitle
	}
}

export const cancelComment = () => {
	return {
		type: 'CLOSE_COMMENT_FORM'
	}
}

export const toggleNavebar = () => {
	// console.log("CALLED")
	return {
		type: 'TOGGLE_NAVIATION'
	}
}

export const postComment = (eventId, comment) => {
	return dispatch => {
		fetch('/api/demo/event/postComment', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: 
				JSON.stringify({
				eventId: eventId,
				comment: comment,
				username: 'demo'
			})
			
		})
		.then(response => response.json())
		.then(user => {
			dispatch(receiveComment(user))})
	}
}

export const getUserRsvpEvents = () => {
	return dispatch => {
		fetch('/api/demo/user/profile/demo', {
			method: "GET",
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(response => response.json())
		.then(json => {
			let eventsRsvp = json.eventsRsvp;
			dispatch(receiveUserRsvpEvents(eventsRsvp))
		})
		.catch(err => {
			// dispatch the error
			console.log(err);
		})
	}
};

export const newPostForm = () => {
	return {
		type: 'NEW_POST_FORM'
	}
}


export const demoCancelRsvp = (event) => {
	return dispatch => {
		fetch('/api/demo/user/cancelRsvp/' + event._id, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: "demo",
			})
		})
		.then(response => response.json())
		.then(user => dispatch(receiveCancelRsvp(user)))
	}
};

export const demoCancelEvent = (event) => {
	return dispatch => {
		fetch('/api/demo/user/cancelEvent/' + event._id, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: "demo",
			})			
		})
		.then(response => response.json())
		.then(event => {
			console.log("CANCEL", event)
			dispatch(receiveCancelEvent(event))
		})
	}
};

export const demoClickRsvp = (event) => {
	return dispatch => {
		fetch('/api/demo/user/' + event._id, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: "demo",
				name: event.name,
				location: event.location,
				time: event.time,
				description: event.description,
				tag: event.tag,
				price: event.price
			})
		})
		.then(response => response.json())
		.then(event => dispatch(receiveRsvpEvent(event)))
	}
};

export const getAllUsers = () => {
	return dispatch => {
		fetch('/api/demo/user/allUser', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(response => response.json())
		.then(users => dispatch(requestAllUsersDataFromServer(users)))
	}
}


/*************
GET
**************/
export const demoGetUserProfile = () => {
	return dispatch => {
		fetch('/api/demo/user/profile/demo', {
			method: "GET",
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(response => response.json())
		.then(json => {
			dispatch(receiveUserProfileFromAPI(json))
		})
		.catch(err => {
			// dispatch the error
			console.log(err);
		})
	}
}

export const demoGetAllEvents = () => {
	return dispatch => {
		fetch('/api/demo/event/all', {
			method: "GET",
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(response => response.json())
		.then(json => {		
			// console.log(json);
			dispatch(receiveAllEventsDataFromAPI(json));
		})		
		.catch(err => {
			console.error('Parsing failed', err);
		})
	}
}

export const demoPostEvent = (name, price, description, location, tag, time) => {
	return dispatch => {
		fetch('/api/demo/event', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: name,
				price: price,
				description: description,
				location: location,
				tag: tag,
				time: time
			})
		})
		.then(response => response.json())
		.then(event => {
			dispatch(receivePostEvent(event))
		}) // Need reducers for that? Not necessary.
	}
}

export const addUser = (username, password, nickname) => {
	return dispatch => {
		fetch('/api/demo/user/' + username, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username,
				password,
				nickname
			})
		})
		.then(response => response.json())
		.then(user => dispatch(receiveRegisterUser(user)))
	}
}












