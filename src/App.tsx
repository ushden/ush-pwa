import { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.scss';

import { Alert } from './components/Alert';
import { Splash } from './components/Splash';
import { useUserState } from './hooks/useUserState';
import { MainPageNavigation } from './navigation/MainPageNavigation';
import { WelcomePageNavigation } from './navigation/WelcomePageNavigation';

export default function App() {
	const user = useUserState();
	const [showSplash, setShowSplash] = useState(true);

	const handleOnLoad = () => {
		setTimeout(() => setShowSplash(false), 2000);
	};

	useEffect(() => {
		window.addEventListener('load', handleOnLoad);

		return () => window.removeEventListener('load', handleOnLoad);
	}, []);

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
