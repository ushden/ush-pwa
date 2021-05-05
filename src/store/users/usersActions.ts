import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {
	ALERT_ERROR,
	ERROR_MESSAGE,
	SUBSCRIPTIONS,
	USERS,
} from '../../constants/constants';
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
const fetchSubscriptionsToAnotherUserAction = (payload: Array<string>) => ({
	type: UsersActions.FETCH_ANOTHER_USER_SUBSCRIPTIONS,
	payload,
});
const fetchFollowersAnotherUserAction = (payload: Array<string>) => ({
	type: UsersActions.FETCH_ANOTHER_USER_FOLLOWERS,
	payload,
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
			dispatch(showAlert(ALERT_ERROR, ERROR_MESSAGE));
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
			dispatch(showAlert(ALERT_ERROR, ERROR_MESSAGE));
		}
	};
};

export const fetchSubscriptionsAnotherUser = (
	userId: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
	return async (dispatch) => {
		try {
			const doc = await firestore.collection(SUBSCRIPTIONS).doc(userId).get();
			const data = doc.data();
			const payload: Array<string> = data?.subscribeOn;

			if (payload) {
				return dispatch(fetchSubscriptionsToAnotherUserAction(payload));
			}

			return null;
		} catch (error) {
			console.error(error.code, error.message);
			dispatch(showAlert(ALERT_ERROR, 'Произошла ошибка :('));
		}
	};
};

export const fetchFollowersAnotherUser = (
	userId: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
	return async (dispatch) => {
		try {
			const doc = await firestore.collection(SUBSCRIPTIONS).doc(userId).get();
			const data = doc.data();
			const payload: Array<string> = data?.followMe;

			if (payload) {
				return dispatch(fetchFollowersAnotherUserAction(payload));
			}

			return null;
		} catch (error) {
			console.error(error.code, error.message);
			dispatch(showAlert(ALERT_ERROR, 'Произошла ошибка :('));
		}
	};
};
