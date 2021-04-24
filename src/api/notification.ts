import { USERS } from '../constants/constants';
import { auth, firestore, messaging } from '../firebase';

export const getToken = async () => {
	try {
		const token = await messaging.getToken({
			vapidKey:
				'BO4zgbncEzrrDHbUxjiRbVg6qzeuENlZHXVdk7taKqEkn1q2f2D3PvkZaVEzALQguh_I5szBJgd8jNhQbSmz6dc',
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
			'AAAAW0Br-bw:APA91bHfsBm0cbvRkU1Kjqv3VicPkPFxYTebNcyGkJAvOiMi9tZGMP0wq2pqONEfxpbSQuR681I3ivcNPEGlO3HUUnPvE8fG4_bj88rodRIY6J4m6V1MvLohAZPcDOY7zqMcGcvJqum6';
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
