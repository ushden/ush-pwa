import { Switch, Route, Redirect } from 'react-router-dom';
import { PostFull } from '../pages/PostFullPage';
import { CreatePostPage } from '../pages/CreatePostPage';
import { SavedPostsPage } from '../pages/SavedPostsPage';
import { MainPage } from '../pages/MainPage';
import { MyPostsPage } from '../pages/MyPostsPage';
import { useUserState } from '../hooks/useUserState';

export const MainPageNavigation = () => {
	const user = useUserState();

	return (
		<Switch>
			<Route path='/' exact render={() => <MainPage />} />
			<Route path='/post/:id' render={() => <PostFull />} />
			<Route path='/create-post' render={() => <CreatePostPage />} />
			<Route path='/save' render={() => <SavedPostsPage />} />
			<Route
				path='/my-posts'
				render={() =>
					user ? <MyPostsPage /> : <Redirect from='/my-posts' to='/' />
				}
			/>
		</Switch>
	);
};
