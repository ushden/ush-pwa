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

messaging.setBackgroundMessageHandler((payload) => {
	console.log('Handling background message', payload);

	payload.data.data = JSON.parse(JSON.stringify(payload.data));

	return self.registration.showNotification(payload.data.title, payload.data);
});

self.addEventListener('notificationclick', function (event) {
	const target = event.notification.data.click_action || '/';
	event.notification.close();

	event.waitUntil(
		clients
			.matchAll({
				type: 'window',
				includeUncontrolled: true,
			})
			.then(function (clientList) {
				for (var i = 0; i < clientList.length; i++) {
					var client = clientList[i];
					if (client.url === target && 'focus' in client) {
						return client.focus();
					}
				}

				return clients.openWindow(target);
			})
	);
});
