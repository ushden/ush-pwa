import { Box } from '@material-ui/core';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';

import { NavigationPanel } from '../components/navigation/NavigationPanel';
import { createChat } from '../store/chats/chatActions';
import { getUser } from '../store/user/userActions';
import { selectAnotherUser, selectPosts, selectUser } from '../store/selectors';
import { fetchAnotherUser } from '../store/users/usersActions';
import { Chat } from '../store/types';
import { Modal } from '../components/ImageModal';
import { ProfileHeader } from '../components/usersPage/ProfileHeader';
import { ProfileBody } from '../components/usersPage/ProfileBody';
import { Post } from '../components/post/Post';

export const UserProfilePage = () => {
	const history = useHistory();
	const { id }: { id: string } = useParams();
	const dispatch = useDispatch();

	const anotherUser = useSelector(selectAnotherUser);
	const user = useSelector(selectUser);
	const posts = useSelector(selectPosts).filter(
		(post) => post.user._id === anotherUser._id
	);

	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const [replaceChatId, setReplaceChatId] = useState<null | string>(null);

	const isChatCreated = useMemo(() => {
		return user.chatWithUsers?.some((chat) => {
			if (chat.userId === anotherUser._id) {
				setReplaceChatId(chat.chatId);
				return true;
			}

			setReplaceChatId(null);

			return false;
		});
	}, [anotherUser._id, user.chatWithUsers]);

	useEffect(() => {
		dispatch(getUser());
		dispatch(fetchAnotherUser(id));
	}, [dispatch, id, user._id]);

	const handleToggleModal = () => {
		setModalVisible((visible) => !visible);
	};

	const handleWriteToUser = () => {
		if (isChatCreated && replaceChatId) {
			history.push(`/chat/${replaceChatId}`);
			return;
		}

		const payload: Chat = {
			_id: Date.now().toString(),
			createAt: new Date().toLocaleString(),
			users: {
				firstUser: {
					_id: user._id,
					name: user.name,
					email: user.email,
					photoUrl: user.photoUrl,
				},
				secondUser: {
					_id: anotherUser._id,
					name: anotherUser.name,
					email: anotherUser.email,
					photoUrl: anotherUser.photoUrl,
				},
			},
		};

		if (user && anotherUser) {
			dispatch(createChat(payload));
			setTimeout(() => history.push(`/chat/${payload._id}`), 500);
		}
	};

	return (
		<Box component='section'>
			<NavigationPanel title='' backButton={true} />
			<ProfileHeader
				onToggleModal={handleToggleModal}
				user={anotherUser}
				currentUserId={user._id}
				onClickWrite={handleWriteToUser}
			/>
			<ProfileBody posts={posts} />
			<Box>
				{posts.map((post) => (
					<Post post={post} id={post._id} key={post._id} />
				))}
			</Box>
			<Modal
				visible={modalVisible}
				onCloseModal={handleToggleModal}
				photoUrl={anotherUser?.photoUrl}
			/>
		</Box>
	);
};
