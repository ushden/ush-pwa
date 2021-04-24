import { USERS } from '../constants/constants';
import { auth, firestore, messaging } from '../firebase';

export const getToken = async () => {
	try {
		const token = await messaging.getToken({
			vapidKey:
				'',
		});
		if (token) {
			return token;
		}
	} catch (error) {
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
		const key =
			'';
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

		console.log(res);
	} catch (error) {
		console.error(error.code, error.message);
	}
};
