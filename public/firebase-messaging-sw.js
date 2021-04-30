/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/8.4.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.4.1/firebase-messaging.js');

const firebaseConfig = {
	apiKey: 'AIzaSyCRSVHLZqOxH63PZzk7APzCBXzi8vQc0Mc',
	authDomain: 'social-pwa-afa9f.firebaseapp.com',
	projectId: 'social-pwa-afa9f',
	storageBucket: 'social-pwa-afa9f.appspot.com',
	messagingSenderId: '391922842044',
	appId: '1:391922842044:web:563c998a60d5dd518053b9',
};

if (firebase.apps.length === 0) {
	firebase.initializeApp(firebaseConfig);
}

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
	const notificationTitle = payload.notification.title;
	const notificationOptions = {
		body: payload.notification.body,
		icon: '/images/icons/icon-72x72.png',
		tag: 'data-notification',
		data: {
			time: new Date(Date.now()).toString(),
			message: payload.notification.body,
		},
	};

	self.registration.showNotification(notificationTitle, notificationOptions);
});
