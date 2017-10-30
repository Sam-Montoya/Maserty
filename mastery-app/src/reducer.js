const initialState = {
	text: 'Welcome, to the Redux Store!',
	username: 'Brettly'
};

const UPDATE_USERNAME = 'UPDATE_USERNAME';

export function updateUsername(text) {
	return {
		type: UPDATE_USERNAME,
		payload: text
	};
}

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case UPDATE_USERNAME:
			return Object.assign({}, state, { username: action.payload });
		default:
			return state;
	}
}
