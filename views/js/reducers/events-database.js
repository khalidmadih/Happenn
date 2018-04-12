const initialState = {
	events: [],
	rsvp: []
}

const eventsDatabase = (state = initialState, action) => {
	switch(action.type) {
		case 'REQUEST_ALL_EVENTS':
			return {
				...state,
			}

		case 'RECEIVE_ALL_EVENTS':
			return {
				...state,
				events: action.events
			}	

		case 'RECEIVE_RSVP_EVENT':
			return {
				...state,
				events: state.events,
				rsvp: action.event.eventsRsvp
			}

		case 'RECEIVE_USER_RSVP_EVENTS':
			return {
				...state,
				rsvp: action.events
			}	

		default:
			return state;
	}
}


export default eventsDatabase;