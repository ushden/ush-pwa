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

interface sendNotificationParams {
	token: string;
	title: string;
	body: string;
	url: string;
}

export const sendNotification = async (payload: sendNotificationParams) => {
	try {
		const key = process.env.REACT_APP_SERVER_KEY;
		const to = payload.token;
		const notification = {
			title: payload.title,
			body: payload.body,
			icon: '/images/icons/icon-72x72.png',
			click_action: payload.url,
		};

		const res = await fetch('https://fcm.googleapis.com/fcm/send', {
			method: 'POST',
			headers: {
				Authorization: 'key=' + key,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				notification: notification,
				to: to,
			}),
		});

		console.log('notification.ts - ', res);
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
