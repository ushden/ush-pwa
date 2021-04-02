import { Switch, Route } from 'react-router-dom';
import { MainPage } from '../pages/MainPage';

export const MainPageNavigation = () => {
	return (
		<Switch>
			<Route path='/' exact>
				<MainPage />
			</Route>
		</Switch>
	);
};
