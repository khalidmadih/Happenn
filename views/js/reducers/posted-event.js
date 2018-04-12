const initialState = {
	event: []
}

const postedEvent = (state = initialState, action) => {
	switch(action.type) {
		case 'RECEIVE_POST_EVENT':
			return {
				...state,
				event: action.event
			}

		case 'NEW_POST_FORM':
			return {
				...state,
				event:[]
			}

		default:
			return state;
	}
}

export default postedEvent;