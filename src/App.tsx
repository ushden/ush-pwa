import { Fragment, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.scss';

import { Alert } from './components/Alert';
import { useUserState } from './hooks/useUserState';
import { MainPageNavigation } from './navigation/MainPageNavigation';
import { WelcomePageNavigation } from './navigation/WelcomePageNavigation';

export default function App() {
	const user = useUserState();

	const handleOnLoad = () => {
		// сделать сплэш скрин или загрузку какую-то
		console.log('app loaded');
	};

	useEffect(() => {
		window.addEventListener('load', handleOnLoad);

		return () => window.removeEventListener('load', handleOnLoad);
	}, []);

	return (
		<Router>
			<Fragment>
				<Alert />
				{user ? <MainPageNavigation /> : <WelcomePageNavigation />}
			</Fragment>
		</Router>
	);
}
