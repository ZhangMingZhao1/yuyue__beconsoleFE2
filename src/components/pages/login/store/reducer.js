import * as constants from './constants';
import { fromJS } from 'immutable';

const defaultState = fromJS({
	user: null
});

export default (state = defaultState, action) => {
	switch(action.type) {
		case constants.CHANGE_LOGIN:
			return state.set('user', action.value);
		case constants.LOGOUT:
			return state.set('user', action.value);
		default:
			return state;
	}
}