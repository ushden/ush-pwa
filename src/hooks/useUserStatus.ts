import { useEffect, useState } from 'react';
import { database } from '../firebase';

export const useUserStatus = (id: string) => {
	const [status, setStatus] = useState<string | null>();

	useEffect(() => {
		if (id) {
			database
				.ref()
				.child('userStatus')
				.child(id)
				.once('value')
				.then((snapshot) => {
					if (snapshot.exists()) {
						setStatus(snapshot.val().status);
					} else {
						setStatus(null);
					}
				});

			return () => database.ref().child('userStatus').child(id).off();
		}
	}, [id]);

	return status;
};
