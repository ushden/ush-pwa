import { Switch, Route } from 'react-router-dom';
import { PostFull } from '../pages/PostFullPage';
import { CreatePostPage } from '../pages/CreatePostPage';
import { SavedPostsPage } from '../pages/SavedPostsPage';
import { MainPage } from '../pages/MainPage';
import { MyPostsPage } from '../pages/MyPostsPage';

export const MainPageNavigation = () => {
	return (
		<Switch>
			<Route path='/' exact render={() => <MainPage />} />
			<Route path='/post/:id' render={() => <PostFull />} />
			<Route path='/create-post' render={() => <CreatePostPage />} />
			<Route path='/save' render={() => <SavedPostsPage />} />
			<Route path='/my-posts' render={() => <MyPostsPage />} />
		</Switch>
	);
};
