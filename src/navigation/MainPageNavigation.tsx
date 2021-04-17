import { Switch, Route } from 'react-router-dom';
import { PostFull } from '../pages/PostFullPage';
import { CreatePostPage } from '../pages/CreatePostPage';
import { SavedPostsPage } from '../pages/SavedPostsPage';
import { MainPage } from '../pages/MainPage';
import { MyPostsPage } from '../pages/MyPostsPage';
import { ProfilePage } from '../pages/ProfilePage';
import { UsersPage } from '../pages/UsersPage';
import { UserProfilePage } from '../pages/UserProfilePage';
import { ChatsPage } from '../pages/ChatsPage';
import { ChatPage } from '../pages/ChatPage';

export const MainPageNavigation = () => {
	return (
		<Switch>
			<Route path='/' exact render={() => <MainPage />} />
			<Route path='/chats' exact render={() => <ChatsPage />} />
			<Route path='/chat/:id' exact render={() => <ChatPage />} />
			<Route path='/post/:id' render={() => <PostFull />} />
			<Route path='/create-post' render={() => <CreatePostPage />} />
			<Route path='/save' render={() => <SavedPostsPage />} />
			<Route path='/my-posts' render={() => <MyPostsPage />} />
			<Route path='/profile' render={() => <ProfilePage />} />
			<Route path='/users' render={() => <UsersPage />} />
			<Route path='/user/:id' render={() => <UserProfilePage />} />
		</Switch>
	);
};
