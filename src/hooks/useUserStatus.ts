import { useEffect, useState } from 'react';
import { USERS } from '../constants/constants';
import {
	auth,
	database,
	TIMESTAMP_DATABASE,
	firestore,
	TIMESTAMP_FIRESTORE,
} from '../firebase';

interface Status {
	status: string;
	lastChanged: number;
}

export const useUserStatus = (id: string) => {
	const [status, setStatus] = useState<Status>();

	useEffect(() => {
		const id = auth.currentUser?.uid;
		const userStatusDatabaseRef = database.ref('/userStatus/' + id);

		const isOfflineForDatabase = {
			status: 'offline',
			lastChanged: TIMESTAMP_DATABASE,
		};

		const isOnlineForDatabase = {
			status: 'online',
			lastChanged: TIMESTAMP_DATABASE,
		};

		const userStatusFirestoreRef = firestore.collection(USERS).doc(id);

		const isOfflineForFirestore = {
			status: 'offline',
			lastChanged: TIMESTAMP_FIRESTORE,
		};

		const isOnlineForFirestore = {
			status: 'online',
			lastChanged: TIMESTAMP_FIRESTORE,
		};

		database.ref('.info/connected').on('value', async (snapshot) => {
			if (snapshot.val() === false) {
				return await userStatusFirestoreRef.update({
					isLogIn: isOfflineForFirestore,
				});
			}

			await userStatusDatabaseRef
				.onDisconnect()
				.set(isOfflineForDatabase)
				.then(function () {
					userStatusDatabaseRef.set(isOnlineForDatabase);

					userStatusFirestoreRef.update({
						isLogIn: isOnlineForFirestore,
					});
				});
		});
	}, []);

	useEffect(() => {
		const unsubscribe = firestore
			.collection(USERS)
			.doc(id)
			.onSnapshot((doc) => {
				const data = doc.data();
				const isLogIn = data?.isLogIn;
				setStatus(isLogIn);
			});

		return () => unsubscribe();
	}, [id]);

	return status;
};
