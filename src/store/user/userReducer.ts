import { UserActions, UserActionsType, UserState } from '../types';

const initialState: UserState = {
	user: {
		_id: '',
		name: '',
		email: '',
		photoUrl: '',
		isLogIn: false,
		savedPosts: [],
		chatWithUsers: [],
	},
	userLoading: false,
};

export const userReducer = (
	state = initialState,
	action: UserActionsType
): UserState => {
	switch (action.type) {
		case UserActions.GET_USER:
			return { ...state, user: { ...action.payload, isLogIn: true } };
		case UserActions.SIGN_OUT:
			return { ...initialState };
		case UserActions.SHOW_USER_LOADER:
			return { ...state, userLoading: true, user: { ...state.user } };
		case UserActions.HIDE_USER_LOADER:
			return { ...state, userLoading: false, user: { ...state.user } };
		default:
			return { ...state };
	}
};
