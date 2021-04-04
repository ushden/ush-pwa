import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {
	GET_USER,
	SIGN_OUT,
	STORAGE_AVATARS,
	USERS,
} from '../../constants/constants';
import { auth, DocData, firestore, storage } from '../../firebase';
import { RootState } from '../rootReducer';
interface signUpPropsType {
	name: string;
	email: string;
	password: string;
	avatar: string;
}

const getUserAction = (payload: DocData) => ({ type: GET_USER, payload });
const signOutUserAction = () => ({ type: SIGN_OUT });

const uploadUserAvatar = async (uri: string, name: string | undefined) => {
	try {
		const response = await fetch(uri);
		const blob = await response.blob();
		const ref = storage.ref().child(`${STORAGE_AVATARS}/${name}`);

		return ref.put(blob);
	} catch (error) {
		console.error(error.message);
	}
};

export const getUser = (): ThunkAction<void, RootState, unknown, AnyAction> => {
	return async (dispatch) => {
		try {
			const id = auth.currentUser?.uid;
			const snapshot = await firestore.collection(USERS).doc(id).get();
			const user = snapshot.data();

			dispatch(getUserAction(user));
		} catch (error) {
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
			let avatarUrl = '';

			await auth
				.createUserWithEmailAndPassword(email, password)
				.then((user) => user);

			const user = auth.currentUser;

			if (user) {
				const snapshot = await uploadUserAvatar(avatar, name);
				await snapshot?.ref.getDownloadURL().then((url) => {
					avatarUrl = url;
				});

				await user.updateProfile({ photoURL: avatarUrl, displayName: name });

				const payload = {
					_id: user.uid,
					name: user.displayName,
					email: user.email,
					photoUrl: user.photoURL,
				};

				await firestore.collection(USERS).doc(user.uid).set(payload);

				dispatch(getUser());
			}
		} catch (error) {
			console.error(error.code, error.message);
		}
	};
};

export const signInUserWithEmailAndPassword = (
	email: string,
	password: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
	return async (dispatch) => {
		try {
			await auth.signInWithEmailAndPassword(email, password);

			const user = auth.currentUser;

			if (user) {
				dispatch(getUser());
			}
		} catch (error) {
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
