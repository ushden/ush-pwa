import { UsersActions, UsersActionsType, UsersState } from '../types';

const initialState: UsersState = {
	anotherUser: {
		_id: '',
		name: '',
		email: '',
		photoUrl: '',
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
		case UsersActions.FETCH_ANOTHER_USER_SUBSCRIPTIONS:
			return {
				...state,
				anotherUser: { ...state.anotherUser, subscribeOn: [...action.payload] },
			};
		case UsersActions.FETCH_ANOTHER_USER_FOLLOWERS:
			return {
				...state,
				anotherUser: { ...state.anotherUser, followMe: [...action.payload] },
			};
		case UsersActions.SHOW_USERS_LOADING:
			return { ...state, usersLoading: true };
		case UsersActions.HIDE_USERS_LOADING:
			return { ...state, usersLoading: false };
		default:
			return { ...state };
	}
};
