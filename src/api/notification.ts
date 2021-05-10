import { USERS } from '../constants/constants';
import { auth, DocData, firestore, messaging } from '../firebase';
import { User } from '../store/types';

export const getToken = async () => {
	try {
		const token = await messaging.getToken({
			vapidKey: process.env.REACT_APP_VAPID_KEY,
		});
		if (token) {
			await setToken(token);

			return token;
		}
	} catch (error) {
		console.log(error.code, error.message);
		return false;
	}
};

export const setToken = async (token: string) => {
	try {
		const user = auth.currentUser;

		await firestore.collection(USERS).doc(user?.uid).update({
			pushToken: token,
		});
	} catch (error) {
		console.error(error.code, error.message);
	}
};

export interface SendNotificationParams {
	token: string | undefined;
	title: string;
	body: string;
	url: string;
}
export interface SendNotificationParamsToGroup {
	tokens: Array<string | undefined>;
	title: string;
	body: string;
	url: string;
}

export interface SendImageNotificationParams {
	token: string | undefined;
	title: string;
	body: string;
	url: string;
	image: string | undefined;
}

export const sendNotification = async (payload: SendNotificationParams) => {
	try {
		const key = process.env.REACT_APP_SERVER_KEY;
		const to = payload.token;
		const data = {
			title: payload.title,
			body: payload.body,
			icon: '/images/icons/icon-72x72.png',
			click_action: '/',
		};

		await fetch('https://fcm.googleapis.com/fcm/send', {
			method: 'POST',
			headers: {
				Authorization: 'key=' + key,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				collapse_key: 'club',
				data,
				to: to,
				priority: 'high',
			}),
		});
	} catch (error) {
		console.error(error.code, error.message);
	}
};

export const fetchToken = async (userId: string) => {
	try {
		const doc = await firestore.collection(USERS).doc(userId).get();
		const user: DocData | User = doc.data();

		if (user?.pushToken) {
			return user?.pushToken;
		}
	} catch (error) {
		console.log(error.code, error.message);
	}
};

export const checkPermission = async () => {
	const permission = await Notification.requestPermission();

	if (permission === 'granted') {
		return true;
	}

	return false;
};

export const sendNotificationToGroupUsers = async (
	payload: SendNotificationParamsToGroup
) => {
	try {
		const key = process.env.REACT_APP_SERVER_KEY;
		const to = payload.tokens;
		const data = {
			title: payload.title,
			body: payload.body,
			icon: '/images/icons/icon-72x72.png',
			click_action: '/',
		};

		await fetch('https://fcm.googleapis.com/fcm/send', {
			method: 'POST',
			headers: {
				Authorization: 'key=' + key,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				collapse_key: 'club',
				data,
				registration_ids: to,
				priority: 'high',
			}),
		});
	} catch (error) {
		console.error(error.code, error.message);
	}
};

export const sendImageNotification = async (
	payload: SendImageNotificationParams
) => {
	try {
		const key = process.env.REACT_APP_SERVER_KEY;
		const to = payload.token;
		const data = {
			title: payload.title,
			body: payload.body,
			icon: '/images/icons/icon-72x72.png',
			image: payload.image,
			click_action: '/',
		};

		await fetch('https://fcm.googleapis.com/fcm/send', {
			method: 'POST',
			headers: {
				Authorization: 'key=' + key,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				collapse_key: 'club',
				data,
				to,
				priority: 'high',
			}),
		});
	} catch (error) {
		console.error(error.code, error.message);
	}
};
