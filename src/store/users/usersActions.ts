import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ALERT_ERROR, USERS } from '../../constants/constants';
import { DocData, firestore } from '../../firebase';
import { showAlert } from '../alert/alertActions';
import { RootState } from '../rootReducer';
import { User, UsersActions } from '../types';

const showUsersLoading = () => ({ type: UsersActions.SHOW_USERS_LOADING });
const hideUsersLoading = () => ({ type: UsersActions.HIDE_USERS_LOADING });
const fetchUsersAction = (payload: Array<User | DocData>) => ({
	type: UsersActions.FETCH_USERS,
	payload,
});
const fetchAnotherUserAction = (payload: User | DocData) => ({
	type: UsersActions.FETCH_ANOTHER_USER,
	payload,
});

export const resetAnotherUser = () => ({
	type: UsersActions.RESET_ANOTHER_USER,
});

export const fetchUsers = (): ThunkAction<
	void,
	RootState,
	unknown,
	AnyAction
> => {
	return async (dispatch) => {
		try {
			dispatch(showUsersLoading());

			const payload: Array<User | DocData> = [];

			const doc = await firestore.collection(USERS).limit(20).get();

			doc.forEach((user) => {
				payload.push(user.data());
			});

			dispatch(fetchUsersAction(payload));
			dispatch(hideUsersLoading());
		} catch (error) {
			console.error(error.code, error.message);
			dispatch(hideUsersLoading());
			dispatch(
				showAlert(ALERT_ERROR, 'Произошла ошибка при загрузке пользователей :(')
			);
		}
	};
};

export const fetchAnotherUser = (
	id: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
	return async (dispatch) => {
		try {
			dispatch(showUsersLoading());

			const doc = await firestore.collection(USERS).doc(id).get();
			const anotherUser = doc.data();

			dispatch(fetchAnotherUserAction(anotherUser));
			dispatch(hideUsersLoading());
		} catch (error) {
			console.error(error.code, error.message);
			dispatch(hideUsersLoading());
			dispatch(
				showAlert(ALERT_ERROR, 'Произошла ошибка при загрузке пользователя :(')
			);
		}
	};
};
