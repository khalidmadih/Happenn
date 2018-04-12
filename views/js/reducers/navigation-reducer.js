const initialState = {
	checked: false
}

const navigationReducer = (state = initialState, action) => {
	switch(action.type) {
		case 'TOGGLE_NAVIATION':
			// console.log("CHECK", state.checked)
			return {
				...state,
				checked: !state.checked

			}

		default:
			return state;
	}
}


export default navigationReducer;