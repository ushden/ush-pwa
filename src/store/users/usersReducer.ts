import { UsersActions, UsersActionsType, UsersState } from '../types';

const initialState: UsersState = {
	anotherUser: {
		_id: '',
		name: '',
		email: '',
		photoUrl: '',
		isLogIn: false,
		savedPosts: [],
		chatWithUsers: [],
	},
	users: [],
	usersLoading: false,
};

export const usersReducer = (
	state = initialState,
	action: UsersActionsType
): UsersState => {
	switch (action.type) {
		case UsersActions.FETCH_USERS:
			return { ...state, users: [...action.payload] };
		case UsersActions.FETCH_ANOTHER_USER:
			return { ...state, anotherUser: { ...action.payload } };
		case UsersActions.SHOW_USERS_LOADING:
			return { ...state, usersLoading: true };
		case UsersActions.HIDE_USERS_LOADING:
			return { ...state, usersLoading: false };
		default:
			return { ...state };
	}
};
