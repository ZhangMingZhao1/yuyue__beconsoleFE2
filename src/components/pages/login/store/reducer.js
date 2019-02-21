import * as constants from './constants';

const defaultState = {
	login: false
}

export default (state = defaultState, action) => {
	switch(action.type) {
		case constants.CHANGE_LOGIN:
			return {...defaultState, ...action.value};
		case constants.LOGOUT:
			return {...defaultState, ...action.value};
		default:
			return state;
	}
}