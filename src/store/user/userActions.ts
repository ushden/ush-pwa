import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {
	GET_USER,
	STORAGE_AVATARS,
	USERS,
	USER_SIGN_UP,
} from '../../constants/constants';
import { auth, DocData, firestore, storage } from '../../firebase';
import { RootState } from '../rootReducer';
import { UserState } from '../types';

interface signUpPropsType {
	name: string;
	email: string;
	password: string;
	avatar: string;
}

const signUpAction = (payload: UserState) => ({ type: USER_SIGN_UP, payload });
const getUserAction = (payload: DocData) => ({ type: GET_USER, payload });

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

export const signUpUserWithEmailAndPassword = ({
	email,
	password,
	avatar,
	name,
}: signUpPropsType): ThunkAction<void, RootState, unknown, AnyAction> => {
	return async (dispatch) => {
		try {
			await auth
				.createUserWithEmailAndPassword(email, password)
				.then((user) => user);

			const user = auth.currentUser;

			if (user) {
				const snapshot = await uploadUserAvatar(avatar, name);
				await snapshot?.ref.getDownloadURL().then((url) => {
					user.updateProfile({ photoURL: url, displayName: name });
				});

				const payload = {
					_id: user.uid,
					name: user.displayName,
					email: user.email,
					photoUrl: user.photoURL,
				};

				await firestore.collection(USERS).doc(user.uid).set(payload);

				dispatch(signUpAction(payload));
			}
		} catch (error) {
			console.error(error.code, error.message);
		}
	};
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
