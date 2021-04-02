import { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, useHistory } from 'react-router-dom';

import './App.scss';

import { Alert } from './components/Alert';
import { useUserState } from './hooks/useUserState';
import { MainPageNavigation } from './navigation/MainPageNavigation';
import { WelcomePageNavigation } from './navigation/WelcomePageNavigation';
import { RootState } from './store/rootReducer';

export default function App() {
	const user = useUserState();
	const history = useHistory();
	const isLogIn = useSelector((state: RootState) => state.user.isLogIn);

	const handleOnLoad = () => {
		// сделать сплэш скрин или загрузку какую-то
	};

	useEffect(() => {
		window.addEventListener('load', handleOnLoad);

		return window.removeEventListener('load', handleOnLoad);
	}, []);

	if (isLogIn) {
		history.push('/');
	}

	return (
		<Router>
			<Fragment>
				<Alert />
				{user ? <MainPageNavigation /> : <WelcomePageNavigation />}
			</Fragment>
		</Router>
	);
}
