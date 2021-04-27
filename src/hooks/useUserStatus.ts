import { useEffect, useRef } from 'react';
import { auth, database, TIMESTAMP_DATABASE } from '../firebase';

interface Status {
	status: string;
	lastChanged: number;
}

const setUserStatus = async () => {
	const id = auth.currentUser?.uid;

	if (id) {
		const currentUserRef = database.ref('/userStatus/' + id);

		const isOffline = {
			status: 'offline',
			lastChanged: TIMESTAMP_DATABASE,
		};

		const isOnline = {
			status: 'online',
			lastChanged: TIMESTAMP_DATABASE,
		};

		database.ref('.info/connected').on('value', (snapshot) => {
			if (snapshot.val() === false) {
				return;
			}

			currentUserRef
				.onDisconnect()
				.set(isOffline)
				.then(() => {
					currentUserRef.set(isOnline);
				});
		});
	}
};

export const useUserStatus = (id: string) => {
	const userRef = database.ref('/userStatus/' + id);
	const status = useRef<Status>();

	useEffect(() => {
		(async () => {
			await setUserStatus();

			userRef.on('value', (snap) => {
				status.current = snap.val();
			});
		})();
	}, [userRef]);

	return status.current?.status;
};
