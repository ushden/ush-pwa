import { CommentsActions, CommentsActionsType, CommentsState } from '../types';

const initialState: CommentsState = {
	comment: {
		_id: '',
		text: '',
		createAt: '',
		postId: '',
		user: {
			_id: '',
			name: '',
			email: '',
			photoUrl: '',
		},
	},
	comments: [],
	commentsLoading: false,
};

export const commentsReducer = (
	state = initialState,
	action: CommentsActionsType
): CommentsState => {
	switch (action.type) {
		case CommentsActions.ADD_COMMENT:
			return {
				...state,
				comment: { ...action.payload },
				comments: [...state.comments, action.payload],
			};
		case CommentsActions.FETCH_COMMENTS:
			return { ...state, comments: [...action.payload] };
		case CommentsActions.SHOW_COMMENT_LOADING:
			return { ...state, commentsLoading: true };
		case CommentsActions.HIDE_COMMENT_LOADING:
			return { ...state, commentsLoading: false };
		default:
			return { ...state };
	}
};
