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
	console.log(
		'[firebase-messaging-sw.js] Received background message ',
		payload
	);
	// Customize notification here
	const notificationTitle = 'Background Message Title';
	const notificationOptions = {
		body: 'Background Message body.',
		icon: '/firebase-logo.png',
	};

	self.registration.showNotification(notificationTitle, notificationOptions);
});
