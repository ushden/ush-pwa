import { GET_USER, USER_SIGN_UP } from '../../constants/constants';
import { UserActions, UserState } from '../types';

const initialState: UserState = {
	_id: '',
	name: '',
	email: '',
	photoUrl: '',
	isLogIn: false,
};

export const userReducer = (
	state = initialState,
	action: UserActions
): UserState => {
	switch (action.type) {
		case USER_SIGN_UP:
			return { ...state, ...action.payload, isLogIn: true };
		case GET_USER:
			return { ...state, ...action.payload };
		default:
			return { ...state };
	}
};
