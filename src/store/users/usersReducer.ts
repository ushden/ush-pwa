import { UsersActions, UsersActionsType, UsersState } from '../types';

const initialState: UsersState = {
	anotherUser: {
		_id: '',
		name: '',
		email: '',
		photoUrl: '',
		gender: 'Не определился',
		phone: '',
		rating: 0,
		isLogIn: {
			status: 'offline',
			lastChanged: '',
		},
		subscribs: 0,
		followers: 0,
		subscribeOn: [],
		followMe: [],
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
			return {
				...state,
				anotherUser: { ...state.anotherUser, ...action.payload },
			};
		case UsersActions.SHOW_USERS_LOADING:
			return { ...state, usersLoading: true };
		case UsersActions.HIDE_USERS_LOADING:
			return { ...state, usersLoading: false };
		case UsersActions.RESET_ANOTHER_USER:
			return { ...state, anotherUser: { ...initialState.anotherUser } };
		default:
			return { ...state };
	}
};
