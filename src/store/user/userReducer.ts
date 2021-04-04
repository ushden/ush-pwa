import { GET_USER, SIGN_OUT } from '../../constants/constants';
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
		case GET_USER:
			return { ...state, ...action.payload, isLogIn: true };
		case SIGN_OUT:
			return { ...initialState };
		default:
			return { ...state };
	}
};
