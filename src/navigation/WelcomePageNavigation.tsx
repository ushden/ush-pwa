import { Switch, Route, Redirect } from 'react-router-dom';
import { useUserState } from '../hooks/useUserState';
import { SignInPage } from '../pages/SignInPage';
import { SignUnPage } from '../pages/SignUnPage';
import { WelcomePage } from '../pages/WelcomePage';

export const WelcomePageNavigation = () => {
	const user = useUserState();

	return (
		<Switch>
			<Route path='/' exact>
				<WelcomePage />
			</Route>
			<Route
				path='/signup'
				render={() => (user ? <Redirect to='/' exact /> : <SignUnPage />)}
			/>
			<Route
				path='/signin'
				render={() => (user ? <Redirect to='/' exact /> : <SignInPage />)}
			/>
		</Switch>
	);
};
