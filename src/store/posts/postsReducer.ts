import { PostsActions, PostsActionsType } from '../types';
import { PostsState } from '../types';

const initialState: PostsState = {
	post: {
		_id: '',
		title: '',
		description: '',
		image: '',
		createAt: '',
		rating: 0,
		user: {
			_id: '',
			name: '',
			email: '',
			photoUrl: '',
		},
	},
	posts: [],
	postLoading: false,
};

export const postsReducer = (
	state = initialState,
	action: PostsActionsType
) => {
	switch (action.type) {
		case PostsActions.CREATE_POST:
			return { ...state, posts: [...state.posts, action.payload] };
		case PostsActions.FETCH_POSTS:
			return { ...state, posts: [...state.posts, ...action.payload] };
		case PostsActions.FETCH_POST:
			return { ...state, post: { ...action.payload }, posts: [...state.posts] };
		case PostsActions.SHOW_POST_LOADER:
			return {
				...state,
				postLoading: true,
				post: { ...state.post },
				posts: [...state.posts],
			};
		case PostsActions.HIDE_POST_LOADER:
			return {
				...state,
				postLoading: false,
				post: { ...state.post },
				posts: [...state.posts],
			};
		case PostsActions.DELETE_POST:
			return {
				...state,
				posts: [...state.posts.filter((post) => post._id !== action.payload)],
			};
		default:
			return { ...initialState };
	}
};
