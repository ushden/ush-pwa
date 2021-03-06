import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/messaging';
import 'firebase/database';

// ADD REACT_APP_FIREBASE_KEY
const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_KEY,
	authDomain: 'social-pwa-afa9f.firebaseapp.com',
	projectId: 'social-pwa-afa9f',
	databaseURL:
		'https://social-pwa-afa9f-default-rtdb.europe-west1.firebasedatabase.app',
	storageBucket: 'social-pwa-afa9f.appspot.com',
	messagingSenderId: '391922842044',
	appId: '1:391922842044:web:563c998a60d5dd518053b9',
};

if (firebase.apps.length === 0) {
	firebase.initializeApp(firebaseConfig);
}

export type User = firebase.User;
export type DocData = firebase.firestore.DocumentData | undefined;

export const TIMESTAMP_FIRESTORE =
	firebase.firestore.FieldValue.serverTimestamp();
export const TIMESTAMP_DATABASE = firebase.database.ServerValue.TIMESTAMP;
export const increment = firebase.firestore.FieldValue.increment(1);
export const decrement = firebase.firestore.FieldValue.increment(-1);
export const incrementRatingForLike =
	firebase.firestore.FieldValue.increment(5);
export const decrementRatingForDislike =
	firebase.firestore.FieldValue.increment(-5);
export const incrementRatingForCreatePost =
	firebase.firestore.FieldValue.increment(10);
export const incrementRatingForFullProfile =
	firebase.firestore.FieldValue.increment(48);
export const incrementRatingForFirstEnter =
	firebase.firestore.FieldValue.increment(100);
export const updateArray = firebase.firestore.FieldValue;

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const messaging = firebase.messaging();
export const database = firebase.database();

// messaging.onMessage((payload) => {
// 	console.log('Message received. ', payload);
// 	// ...
// });
