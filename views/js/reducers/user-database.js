import * as Cookies from 'js-cookie';


const initialState = {
	user: [],
	token: ''
}

const userDatabase = (state = initialState, action) => {
	switch(action.type) {
		case 'RECEIVE_USER_PROFILE':
			return {
				...state,
				user: action.user,
				token: Cookies.get('accessToken')
			}

		case 'RECEIVE_CANCEL_EVENT':
			return {
				...state,
				user: action.user
			}			

		case 'RECEIVE_CANCEL_RSVP':
			return {
				...state,
				user: action.user
			}

		case 'RECEIVE_TOKEN':
			return {
				...state,
				token: action.token
			}

		case 'RECEIVE_COMMENT':
			return {
				...state,
				user: action.user
			}	

		case 'RECEIVE_POSITIVE':
			return {
				...state,
				user: action.user
			}	

		case 'RECEIVE_NEGATIVE':
			return {
				...state,
				user: action.user
			}

		default:
			return state;
	}
}


export default userDatabase;