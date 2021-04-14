import { CommentType, CommentsActions } from './../types';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ALERT_ERROR, COMMENTS, POSTS } from '../../constants/constants';
import { showAlert } from '../alert/alertActions';
import { RootState } from '../rootReducer';
import { auth, firestore, increment, updateArray } from '../../firebase';

const showCommentLoadingAction = () => ({
	type: CommentsActions.SHOW_COMMENT_LOADING,
});
const hideCommentLoadingAction = () => ({
	type: CommentsActions.HIDE_COMMENT_LOADING,
});
const fetchCommentsActions = (payload: Array<CommentType>) => ({
	type: CommentsActions.FETCH_COMMENTS,
	payload,
});

export const addComment = (
	text: string,
	postId: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
	return async (dispatch) => {
		try {
			dispatch(showCommentLoadingAction());

			const user: any = auth.currentUser;

			if (user) {
				const payload: CommentType = {
					_id: Date.now().toString(),
					text,
					createAt: new Date().toLocaleString(),
					postId,
					user: {
						_id: user.uid,
						name: user.displayName,
						email: user.email,
					},
				};

				await firestore
					.collection(COMMENTS)
					.doc(postId)
					.set(
						{
							comments: updateArray.arrayUnion(payload),
						},
						{ merge: true }
					);
				await firestore.collection(POSTS).doc(postId).update({
					comments: increment,
				});

				dispatch(hideCommentLoadingAction());
			}
		} catch (error) {
			console.error(error.code, error.message);
			dispatch(hideCommentLoadingAction());
			dispatch(showAlert(ALERT_ERROR, 'Не удалось добавить комментарий :('));
		}
	};
};

export const fetchComments = (
	postId: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
	return async (dispatch) => {
		try {
			const doc = await firestore.collection(COMMENTS).doc(postId).get();
			const data = doc.data();

			dispatch(fetchCommentsActions(data?.comments));
		} catch (error) {
			console.error(error.code, error.message);
			dispatch(showAlert(ALERT_ERROR, 'Не удалось добавить комментарий :('));
		}
	};
};
