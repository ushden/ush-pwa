import { incrementRatingForFirstEnter } from './../../firebase';
import { fetchAnotherUser } from './../users/usersActions';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {
	ALERT_ERROR,
	ALERT_INFO,
	ALERT_SUCCESS,
	ALERT_WARNING,
	STORAGE_AVATARS,
	USERS,
} from '../../constants/constants';
import {
	auth,
	decrement,
	firestore,
	increment,
	incrementRatingForFullProfile,
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

				await firestore
					.collection(USERS)
					.doc(user.uid)
					.update({ rating: incrementRatingForFirstEnter });

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
					.collection(USERS)
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
					.collection(USERS)
					.doc(userId)
					.set(
						{
							followMe: updateArray.arrayUnion(uid),
						},
						{ merge: true }
					);

				dispatch(fetchAnotherUser(userId));
				dispatch(showAlert(ALERT_SUCCESS, 'Вы подписались на пользователя'));
			}
		} catch (error) {
			console.error(error.code, error.message);
			dispatch(showAlert(ALERT_ERROR, 'Произошла ошибка при подписке :('));
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
					.collection(USERS)
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
					.collection(USERS)
					.doc(userId)
					.set(
						{
							followMe: updateArray.arrayRemove(uid),
						},
						{ merge: true }
					);

				dispatch(fetchAnotherUser(userId));
				dispatch(showAlert(ALERT_WARNING, 'Вы отписались от пользователя'));
			}
		} catch (error) {
			console.error(error.code, error.message);
			dispatch(showAlert(ALERT_ERROR, 'Произошла ошибка при отписке :('));
		}
	};
};

export const changePassword = (
	password: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
	return async (dispatch) => {
		try {
			const id = auth.currentUser?.uid;

			if (id) {
				await auth.currentUser?.updatePassword(password);

				dispatch(showAlert(ALERT_SUCCESS, 'Пароль изменен!'));
			}
		} catch (error) {
			console.error(error.code, error.message);
			dispatch(showAlert(ALERT_ERROR, 'Ошибка при смене пароля!'));
		}
	};
};

interface UpdateProfileArgs {
	email: string;
	name: string;
	phone?: string;
	gender?: string;
}

export const updateProfile = (
	payload: UpdateProfileArgs
): ThunkAction<void, RootState, unknown, AnyAction> => {
	return async (dispatch) => {
		try {
			const { email, name, phone, gender } = payload;
			const id = auth.currentUser?.uid;
			const currentEmail = auth.currentUser?.email;
			const currentName = auth.currentUser?.displayName;

			if (id && currentEmail && currentName) {
				dispatch(showAlert(ALERT_INFO, 'Подождите, обновляем профиль....'));

				if (email !== currentEmail) {
					await auth.currentUser?.updateEmail(email);
					await firestore.collection(USERS).doc(id).update({ email });
				}

				if (name !== currentName) {
					await auth.currentUser?.updateProfile({
						displayName: name,
					});
					await firestore.collection(USERS).doc(id).update({ name });
				}

				if (phone) {
					await firestore
						.collection(USERS)
						.doc(id)
						.update({
							phone: '+380' + phone,
						});
				}

				if (gender) {
					await firestore.collection(USERS).doc(id).update({ gender });
				}

				dispatch(showAlert(ALERT_SUCCESS, 'Профиль обновлен!'));

				if (name && email && phone && gender) {
					await firestore
						.collection(USERS)
						.doc(id)
						.update({ rating: incrementRatingForFullProfile });

					setTimeout(
						() =>
							dispatch(
								showAlert(
									ALERT_SUCCESS,
									'Вы заполнили все поля и получили + 48 к рейтингу! Поздравляю!'
								)
							),
						5000
					);
				}
			}
		} catch (error) {
			console.error(error.code, error.message);
			dispatch(showAlert(ALERT_ERROR, 'Ошибка при смене пароля!'));
		}
	};
};

export const updateAvatar = (
	photoUrl: string,
	name: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
	return async (dispatch) => {
		try {
			const id = auth.currentUser?.uid;

			if (photoUrl && name && id) {
				const url = await uploadImage(photoUrl, name, 'user');

				if (url) {
					await auth.currentUser?.updateProfile({
						photoURL: url,
					});

					await firestore.collection(USERS).doc(id).update({
						photoUrl: url,
					});
				}

				dispatch(
					showAlert(ALERT_SUCCESS, 'Аватар обновлен! Вы отлично выглядите :)')
				);
			}
		} catch (error) {
			console.error(error.code, error.message);
			dispatch(showAlert(ALERT_ERROR, 'Не удалось обновить аватар :('));
		}
	};
};
