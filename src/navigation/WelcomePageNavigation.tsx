import { Switch, Route } from 'react-router-dom';
import { SignInPage } from '../pages/SignInPage';
import { SignUnPage } from '../pages/SignUnPage';
import { WelcomePage } from '../pages/WelcomePage';

export const WelcomePageNavigation = () => {
	return (
		<Switch>
			<Route path='/' exact>
				<WelcomePage />
			</Route>
			<Route path='/signup'>
				<SignUnPage />
			</Route>
			<Route path='/signin'>
				<SignInPage />
			</Route>
		</Switch>
	);
};
