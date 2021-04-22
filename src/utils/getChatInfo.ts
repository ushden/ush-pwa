import { auth } from '../firebase';
import { Chat } from '../store/types';

export const getChatName = (chat: Chat) => {
	const user = auth?.currentUser;
	const firstUserName = chat?.users?.firstUser.name;
	const secondUserName = chat?.users?.secondUser.name;

	return firstUserName === user?.displayName ? secondUserName : firstUserName;
};

export const getChatAvatar = (chat: Chat) => {
	const user = auth?.currentUser;
	const firstUserAvatar = chat?.users?.firstUser.photoUrl;
	const secondUserAvatar = chat?.users?.secondUser.photoUrl;

	return firstUserAvatar === user?.photoURL
		? secondUserAvatar
		: firstUserAvatar;
};
