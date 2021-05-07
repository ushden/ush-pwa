import {
	ANIME,
	DEAD,
	EMOJI,
	SAD,
	SMILE,
	USERS,
} from './../../constants/constants';
import { CommentType, CommentsActions } from './../types';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {
	ALERT_ERROR,
	ALERT_SUCCESS,
	COMMENTS,
	POSTS,
} from '../../constants/constants';
import { showAlert } from '../alert/alertActions';
import { RootState } from '../rootReducer';
import {
	auth,
	decrement,
	firestore,
	increment,
	updateArray,
} from '../../firebase';

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
const deleteCommentAction = (payload: string) => ({
	type: CommentsActions.DELETE_COMMENT,
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
						photoUrl: user.photoURL,
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

				await firestore.collection(USERS).doc(user.uid).update({
					rating: increment,
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

			if (data) {
				dispatch(fetchCommentsActions(data?.comments));
			}

			return null;
		} catch (error) {
			console.error(error.code, error.message);
			dispatch(showAlert(ALERT_ERROR, 'Не удалось добавить комментарий :('));
		}
	};
};

export const deleteComment = (
	comment: CommentType
): ThunkAction<void, RootState, unknown, AnyAction> => {
	return async (dispatch) => {
		try {
			await firestore
				.collection(COMMENTS)
				.doc(comment.postId)
				.update({
					comments: updateArray.arrayRemove(comment),
				});
			await firestore.collection(POSTS).doc(comment.postId).update({
				comments: decrement,
			});

			dispatch(deleteCommentAction(comment._id));
			dispatch(showAlert(ALERT_SUCCESS, 'Комментарий успешно удален :)'));
		} catch (error) {
			console.error(error.code, error.message);
			dispatch(showAlert(ALERT_ERROR, 'Произошла ошибка :('));
		}
	};
};

export const addCommentEmoji = (
	comment: CommentType,
	type: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
	return async (dispatch) => {
		try {
			const user = auth.currentUser;

			if (user) {
				await firestore
					.collection(EMOJI)
					.doc(comment._id)
					.set(
						{
							smile:
								type === SMILE
									? updateArray.arrayUnion(user.uid)
									: updateArray.arrayRemove(user.uid),
							sad:
								type === SAD
									? updateArray.arrayUnion(user.uid)
									: updateArray.arrayRemove(user.uid),
							dead:
								type === DEAD
									? updateArray.arrayUnion(user.uid)
									: updateArray.arrayRemove(user.uid),
							anime:
								type === ANIME
									? updateArray.arrayUnion(user.uid)
									: updateArray.arrayRemove(user.uid),
						},
						{ merge: true }
					);

				await firestore
					.collection(USERS)
					.doc(comment.user._id)
					.update({ rating: increment });
			}
		} catch (error) {
			console.error(error.code, error.message);
			dispatch(showAlert(ALERT_ERROR, 'Произошла ошибка'));
		}
	};
};
