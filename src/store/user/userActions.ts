import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ALERT_ERROR, STORAGE_AVATARS, USERS } from '../../constants/constants';
import { auth, firestore } from '../../firebase';
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
