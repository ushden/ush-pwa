import { HIDE_ALERT, SHOW_ALERT } from '../../constants/constants';
import { AlertActions, AlertState } from '../types';

const defaultState: AlertState = {
	visible: false,
	type: 'error',
	message: '',
};

export const alertReducer = (state = defaultState, action: AlertActions) => {
	switch (action.type) {
		case SHOW_ALERT:
			return { ...state, ...action.payload };
		case HIDE_ALERT:
			return { ...state, visible: action.payload };
		default:
			return { ...state };
	}
};
