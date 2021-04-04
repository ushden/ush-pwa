import { Switch, Route } from 'react-router-dom';
import { PostFull } from '../components/post/PostFull';
import { CreatePostPage } from '../pages/CreatePostPage';
import { MainPage } from '../pages/MainPage';

export const MainPageNavigation = () => {
	return (
		<Switch>
			<Route path='/' exact render={() => <MainPage />} />
			<Route path='/post/:id' render={() => <PostFull />} />
			<Route path='/create-post' render={() => <CreatePostPage />} />
		</Switch>
	);
};
