import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {
	ALERT_ERROR,
	ALERT_SUCCESS,
	ALERT_WARNING,
	STORAGE_AVATARS,
	SUBSCRIPTIONS,
	USERS,
} from '../../constants/constants';
import {
	auth,
	decrement,
	firestore,
	increment,
	updateArray,
} from '../../firebase';
import { uploadImage } from '../../api/uploadImage';
import { RootState } from '../rootReducer';
import { User, UserActions } from '../types';
import { showAlert } from '../alert/alertActions';
interface signUpPropsType {
	name: string;
	email: string;
	password: string;
	avatar: string;
}

const getUserAction = (payload: User) => ({
	type: UserActions.GET_USER,
	payload,
});
const signOutUserAction = () => ({ type: UserActions.SIGN_OUT });
const showUserLoaderAction = () => ({ type: UserActions.SHOW_USER_LOADER });
const hideUserLoaderAction = () => ({ type: UserActions.HIDE_USER_LOADER });
const fetchSubscriptionsAction = (payload: Array<string>) => ({
	type: UserActions.FETCH_USER_SUBSCRIPTIONS,
	payload,
});
const fetchFollowersAction = (payload: Array<string>) => ({
	type: UserActions.FETCH_USER_FOLLOWERS,
	payload,
});

export const getUser = (): ThunkAction<void, RootState, unknown, AnyAction> => {
	return async (dispatch) => {
		try {
			const id = auth.currentUser?.uid;
			const snapshot = await firestore.collection(USERS).doc(id).get();
			const user: any = snapshot.data();

			dispatch(getUserAction(user));
		} catch (error) {
			dispatch(showAlert(ALERT_ERROR, 'Не удалось загрузить пользователя'));
			console.error(error.code, error.message);
		}
	};
};

export const signUpUserWithEmailAndPassword = ({
	email,
	password,
	avatar,
	name,
}: signUpPropsType): ThunkAction<void, RootState, unknown, AnyAction> => {
	return async (dispatch) => {
		try {
			dispatch(showUserLoaderAction());

			await auth
				.createUserWithEmailAndPassword(email, password)
				.then((user) => user);

			const user = auth.currentUser;

			if (user) {
				const avatarUrl = await uploadImage(avatar, name, STORAGE_AVATARS);

				await user.updateProfile({ photoURL: avatarUrl, displayName: name });

				const payload = {
					_id: user.uid,
					name: user.displayName,
					email: user.email,
					photoUrl: user.photoURL,
				};

				await firestore.collection(USERS).doc(user.uid).set(payload);

				dispatch(hideUserLoaderAction());
			}
		} catch (error) {
			dispatch(hideUserLoaderAction());
			dispatch(showAlert(ALERT_ERROR, 'Не удалось зарегестрироватся'));
			console.error(error.code);
		}
	};
};

export const signInUserWithEmailAndPassword = (
	email: string,
	password: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
	return async (dispatch) => {
		try {
			dispatch(showUserLoaderAction());
			await auth.signInWithEmailAndPassword(email, password);

			const user = auth.currentUser;

			if (user) {
				dispatch(hideUserLoaderAction());
				dispatch(getUser());
			}
		} catch (error) {
			dispatch(hideUserLoaderAction());
			dispatch(showAlert(ALERT_ERROR, 'Не удалось войти'));
			console.log(error.code, error.message);
		}
	};
};

export const signOut = (): ThunkAction<void, RootState, unknown, AnyAction> => {
	return async (dispatch) => {
		try {
			await auth.signOut();
			dispatch(signOutUserAction());
		} catch (error) {
			console.error(error.code, error.message);
		}
	};
};

export const subscribeOnUser = (
	userId: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
	return async (dispatch) => {
		try {
			const uid = auth.currentUser?.uid;

			if (uid) {
				await firestore
					.collection(SUBSCRIPTIONS)
					.doc(uid)
					.set(
						{
							subscribeOn: updateArray.arrayUnion(userId),
						},
						{ merge: true }
					);

				await firestore.collection(USERS).doc(uid).update({
					subscribs: increment,
				});

				await firestore.collection(USERS).doc(userId).update({
					followers: increment,
				});

				await firestore
					.collection(SUBSCRIPTIONS)
					.doc(userId)
					.set(
						{
							followMe: updateArray.arrayUnion(uid),
						},
						{ merge: true }
					);

				dispatch(showAlert(ALERT_SUCCESS, 'Вы подписались на пользователя'));
			}
		} catch (error) {
			console.error(error.code, error.message);
			dispatch(showAlert(ALERT_ERROR, 'Произошла ошибка :('));
		}
	};
};

export const unsubscribeOnUser = (
	userId: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
	return async (dispatch) => {
		try {
			const uid = auth.currentUser?.uid;

			if (uid) {
				await firestore
					.collection(SUBSCRIPTIONS)
					.doc(uid)
					.set(
						{
							subscribeOn: updateArray.arrayRemove(userId),
						},
						{ merge: true }
					);

				await firestore.collection(USERS).doc(uid).update({
					subscribs: decrement,
				});

				await firestore.collection(USERS).doc(userId).update({
					followers: decrement,
				});

				await firestore
					.collection(SUBSCRIPTIONS)
					.doc(userId)
					.set(
						{
							followMe: updateArray.arrayRemove(uid),
						},
						{ merge: true }
					);

				dispatch(showAlert(ALERT_WARNING, 'Вы отписались от пользователя'));
			}
		} catch (error) {
			console.error(error.code, error.message);
			dispatch(showAlert(ALERT_ERROR, 'Произошла ошибка :('));
		}
	};
};

export const fetchSubscriptions = (): ThunkAction<
	void,
	RootState,
	unknown,
	AnyAction
> => {
	return async (dispatch) => {
		try {
			const uid = auth.currentUser?.uid;

			if (uid) {
				const doc = await firestore.collection(SUBSCRIPTIONS).doc(uid).get();
				const data = doc.data();
				const payload: Array<string> = data?.subscribeOn;

				if (payload) {
					return dispatch(fetchSubscriptionsAction(payload));
				}

				return null;
			}
		} catch (error) {
			console.error(error.code, error.message);
			dispatch(showAlert(ALERT_ERROR, 'Произошла ошибка :('));
		}
	};
};

export const fetchFollowers = (): ThunkAction<
	void,
	RootState,
	unknown,
	AnyAction
> => {
	return async (dispatch) => {
		try {
			const uid = auth.currentUser?.uid;

			if (uid) {
				const doc = await firestore.collection(SUBSCRIPTIONS).doc(uid).get();
				const data = doc.data();
				const payload: Array<string> = data?.followMe;

				if (payload) {
					return dispatch(fetchFollowersAction(payload));
				}

				return null;
			}
		} catch (error) {
			console.error(error.code, error.message);
			dispatch(showAlert(ALERT_ERROR, 'Произошла ошибка :('));
		}
	};
};
