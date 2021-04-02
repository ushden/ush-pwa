import { useState, useEffect } from 'react';
import { auth, User } from '../firebase';

export const useUserState = () => {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user) {
				setUser(user);
			} else {
				setUser(null);
			}
		});

		return () => unsubscribe();
	}, [user]);

	return user;
};
