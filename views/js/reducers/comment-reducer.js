const initialState = {
	comment: '',
	eventId: null,
	eventTitle: '',
	show: false
}

const commentReducer = (state = initialState, action) => {
	switch(action.type) {
		case 'REQUEST_COMMENT_FORM':
			return {
				...state,
				eventId: action.eventId,
				eventTitle: action.eventTitle,
				show: true
			}

		case 'CLOSE_COMMENT_FORM':
			return {
				...state,
				show: false
			}		

		case 'RECEIVE_COMMENT':
			return {
				...state,
				show: false
			}						

		default:
			return state;
	}
}

export default commentReducer;