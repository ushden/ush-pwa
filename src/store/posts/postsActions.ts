import {
	incrementRatingForLike,
	decrementRatingForDislike,
} from './../../firebase';
import {
	ALERT_ERROR,
	ALERT_INFO,
	ALERT_SUCCESS,
	COMMENTS,
	RATING,
	USERS,
} from './../../constants/constants';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { POSTS } from '../../constants/constants';
import {
	auth,
	decrement,
	firestore,
	increment,
	incrementRatingForCreatePost,
	updateArray,
} from '../../firebase';
import { showAlert } from '../alert/alertActions';
import { RootState } from '../rootReducer';
import { PostType, PostsActions } from '../types';
import { uploadImage } from '../../api/uploadImage';

const fetchPostsAction = (payload: Array<PostType>) => ({
	type: PostsActions.FETCH_POSTS,
	payload,
});
const fetchPostAction = (payload: PostType) => ({
	type: PostsActions.FETCH_POST,
	payload,
});
const createPostAction = (payload: PostType) => ({
	type: PostsActions.CREATE_POST,
	payload,
});
const showPostLoaderAction = () => ({ type: PostsActions.SHOW_POST_LOADER });
const hidePostLoaderAction = () => ({ type: PostsActions.HIDE_POST_LOADER });
const deletePostAction = (id: string) => ({
	type: PostsActions.DELETE_POST,
	payload: id,
});

export const fetchPosts = (): ThunkAction<
	void,
	RootState,
	unknown,
	AnyAction
> => {
	return async (dispatch) => {
		try {
			dispatch(showPostLoaderAction());

			const payload: Array<any> = [];
			const querySnapshot = await firestore
				.collection(POSTS)
				.limit(50)
				.orderBy('_id', 'desc')
				.get();

			querySnapshot.forEach((doc) => {
				const post = doc.data();

				payload.push(post);
			});

			dispatch(fetchPostsAction(payload));
			dispatch(hidePostLoaderAction());
		} catch (error) {
			console.error(error.code, error.message);
			dispatch(hidePostLoaderAction());
			dispatch(showAlert(ALERT_ERROR, 'Не удалось загрузить посты'));
		}
	};
};

export const createPost = (
	post: PostType
): ThunkAction<void, RootState, unknown, AnyAction> => {
	return async (dispatch) => {
		try {
			dispatch(showPostLoaderAction());

			const url = await uploadImage(post.image, post._id, POSTS);
			console.log(url);

			if (url) {
				const payload = { ...post, image: url };
				await firestore.collection(POSTS).doc(post._id).set(payload);

				dispatch(createPostAction(payload));
				setTimeout(() => dispatch(hidePostLoaderAction()), 200);
				setTimeout(
					() =>
						dispatch(
							showAlert(ALERT_SUCCESS, 'Поздравляю, Вы создали пост! УРА!')
						),
					200
				);

				await firestore
					.collection(USERS)
					.doc(post.user._id)
					.update({ rating: incrementRatingForCreatePost });
			}
		} catch (error) {
			console.error(error.code, error.message);
			dispatch(showAlert(ALERT_ERROR, 'Не удалось создать пост'));
			dispatch(hidePostLoaderAction());
		}
	};
};

export const fetchPost = (
	id: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
	return async (dispatch) => {
		try {
			dispatch(showPostLoaderAction());
			const doc = await firestore.collection(POSTS).doc(id).get();

			if (doc.exists) {
				const post: any = doc.data();

				dispatch(fetchPostAction(post));
				dispatch(hidePostLoaderAction());
			}
		} catch (error) {
			dispatch(showAlert(ALERT_ERROR, 'Произошла ошибка!'));
			dispatch(hidePostLoaderAction());
		}
	};
};

export const likePost = (
	postId: string,
	author: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
	return async (dispatch) => {
		try {
			const user = auth.currentUser;

			if (user) {
				await firestore
					.collection(POSTS)
					.doc(postId)
					.update({ rating: increment });
				await firestore
					.collection(RATING)
					.doc(postId)
					.set(
						{
							likes: updateArray.arrayUnion(user.uid),
							dislike: updateArray.arrayRemove(user.uid),
						},
						{ merge: true }
					);
				if (author) {
					await firestore.collection(USERS).doc(user.uid).update({
						rating: incrementRatingForLike,
					});
				}
			}
		} catch (error) {
			console.error(error.code, error.message);
			dispatch(showAlert(ALERT_ERROR, 'Произошла ошибка'));
		}
	};
};

export const dislikePost = (
	postId: string,
	author: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
	return async (dispatch) => {
		try {
			const user = auth.currentUser;

			if (user) {
				await firestore
					.collection(POSTS)
					.doc(postId)
					.update({ rating: decrement });
				await firestore
					.collection(RATING)
					.doc(postId)
					.set(
						{
							likes: updateArray.arrayRemove(user.uid),
							dislike: updateArray.arrayUnion(user.uid),
						},
						{ merge: true }
					);
				if (author) {
					await firestore.collection(USERS).doc(author).update({
						rating: decrementRatingForDislike,
					});
				}
			}
		} catch (error) {
			console.error(error.code, error.message);
			dispatch(showAlert(ALERT_ERROR, 'Произошла ошибка'));
		}
	};
};

export const deletePost = (
	id: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
	return async (dispatch) => {
		try {
			await firestore.collection(POSTS).doc(id).delete();
			await firestore.collection(COMMENTS).doc(id).delete();

			dispatch(deletePostAction(id));
			dispatch(showAlert(ALERT_SUCCESS, 'Пост успешно удален :)'));
		} catch (error) {
			console.error(error.code, error.message);
			dispatch(
				showAlert(ALERT_ERROR, 'Произошла ошибка при удалении поста :(')
			);
		}
	};
};

export const savePost = (
	postID: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
	return async (dispatch) => {
		try {
			const user = auth.currentUser;

			if (user) {
				await firestore
					.collection(USERS)
					.doc(user.uid)
					.update({
						savedPosts: updateArray.arrayUnion(postID),
					});
			}

			dispatch(showAlert(ALERT_INFO, 'Пост сохранен'));
		} catch (error) {
			console.error(error.code, error.message);
			dispatch(
				showAlert(ALERT_ERROR, 'Произошла ошибка при сохранении поста :(')
			);
		}
	};
};

export const unSavePost = (
	postID: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
	return async (dispatch) => {
		try {
			const user = auth.currentUser;

			if (user) {
				await firestore
					.collection(USERS)
					.doc(user.uid)
					.update({
						savedPosts: updateArray.arrayRemove(postID),
					});
			}

			dispatch(showAlert(ALERT_INFO, 'Пост больше не сохранен'));
		} catch (error) {
			console.error(error.code, error.message);
			dispatch(
				showAlert(
					ALERT_ERROR,
					'Произошла ошибка удалении поста с сохранненых :('
				)
			);
		}
	};
};
