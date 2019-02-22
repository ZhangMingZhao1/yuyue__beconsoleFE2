import * as constants from './constants';
import { fromJS } from 'immutable';

const defaultState = fromJS({
	login: false
});

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