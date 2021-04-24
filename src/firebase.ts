import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/messaging';

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

export type User = firebase.User;
export type DocData = firebase.firestore.DocumentData | undefined;

export const increment = firebase.firestore.FieldValue.increment(1);
export const decrement = firebase.firestore.FieldValue.increment(-1);
export const updateArray = firebase.firestore.FieldValue;

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const messaging = firebase.messaging();

messaging.onMessage((payload) => {
	console.log('Message received. ', payload);
	// ...
});
