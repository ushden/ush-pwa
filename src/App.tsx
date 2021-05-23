import { BrowserRouter as Router } from 'react-router-dom';
import { useState, useEffect, Fragment } from 'react';

import './App.scss';

import { Alert } from './components/Alert';
import { Splash } from './components/Splash';
import { useUserState } from './hooks/useUserState';
import { MainPageNavigation } from './navigation/MainPageNavigation';
import { WelcomePageNavigation } from './navigation/WelcomePageNavigation';
import { firestore, database } from './firebase';
import { USERS } from './constants/constants';

export default function App() {
	const user = useUserState();
	const [showSplash, setShowSplash] = useState(true);

	const handleOnLoad = () => {
		setTimeout(() => setShowSplash(false), 2000);
	};

	useEffect(() => {
		const isOfflineForDatabase = {
			status: 'offline',
		};

		const isOnlineForDatabase = {
			status: 'online',
		};

		database.ref('.info/connected').on('value', async (snapshot) => {
			if (snapshot.val() === false) {
				return;
			}

			if (user?.uid) {
				await database
					.ref()
					.child('userStatus')
					.child(user?.uid)
					.onDisconnect()
					.set(isOfflineForDatabase)
					.then(function () {
						database
							.ref()
							.child('userStatus')
							.child(user.uid)
							.set(isOnlineForDatabase);
					});
			}
		});
	}, [user?.uid]);

	useEffect(() => {
		window.addEventListener('load', handleOnLoad);

		return () => window.removeEventListener('load', handleOnLoad);
	}, []);

	useEffect(() => {
		if (user) {
			firestore
				.collection(USERS)
				.doc(user.uid)
				.update({
					isLogIn: { lastChanged: Date.now() },
				});
		}
	}, [user]);

	return (
		<Router>
			<Fragment>
				<Alert />
				<Splash visible={showSplash} />
				{user ? <MainPageNavigation /> : <WelcomePageNavigation />}
			</Fragment>
		</Router>
	);
}
