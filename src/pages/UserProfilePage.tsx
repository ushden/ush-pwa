import { Box, Typography } from '@material-ui/core';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';

import { NavigationPanel } from '../components/navigation/NavigationPanel';
import { createChat } from '../store/chats/chatActions';
import {
	fetchSubscriptions,
	getUser,
	subscribeOnUser,
	unsubscribeOnUser,
} from '../store/user/userActions';
import {
	selectAnotherUser,
	selectPosts,
	selectSubscribeOn,
	selectUser,
} from '../store/selectors';
import { fetchAnotherUser } from '../store/users/usersActions';
import { Chat } from '../store/types';
import { Modal } from '../components/ImageModal';
import { ProfileHeader } from '../components/usersPage/ProfileHeader';
import { ProfileBody } from '../components/usersPage/ProfileBody';
import { Post } from '../components/post/Post';
import { firestore } from '../firebase';
import { SUBSCRIPTIONS } from '../constants/constants';

export const UserProfilePage = () => {
	const history = useHistory();
	const { id }: { id: string } = useParams();
	const dispatch = useDispatch();

	const anotherUser = useSelector(selectAnotherUser);
	const user = useSelector(selectUser);
	const posts = useSelector(selectPosts).filter(
		(post) => post.user._id === anotherUser._id
	);
	const rating = posts.reduce((acc, el) => {
		if (el.rating) {
			return acc + el.rating;
		}

		return 0;
	}, 0);
	const isSubscribe = useSelector(selectSubscribeOn)?.includes(id);
	const subscribs = anotherUser.subscribs;
	const followers = anotherUser.followers;

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

	useEffect(() => {
		const unsubscribe = firestore
			.collection(SUBSCRIPTIONS)
			.doc(id)
			.onSnapshot(() => {
				dispatch(fetchSubscriptions());
				dispatch(fetchAnotherUser(id));
			});

		return () => unsubscribe();
	}, [dispatch, id]);

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

	const handleSubscribeClick = () => {
		if (isSubscribe) {
			dispatch(unsubscribeOnUser(id));
		} else {
			dispatch(subscribeOnUser(id));
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
				onSubscribe={handleSubscribeClick}
				isSubscribe={isSubscribe}
			/>
			<ProfileBody
				posts={posts}
				rating={rating}
				subscribs={subscribs}
				followers={followers}
			/>
			<Box>
				{posts.length === 0 ? (
					<Typography
						component='p'
						style={{
							color: '#ccc',
							fontWeight: 'lighter',
							paddingTop: '1rem',
							paddingBottom: '1rem',
							textAlign: 'center',
						}}>
						У пользователя еще нету постов :)
					</Typography>
				) : (
					posts.map((post) => <Post post={post} id={post._id} key={post._id} />)
				)}
			</Box>
			<Modal
				visible={modalVisible}
				onCloseModal={handleToggleModal}
				photoUrl={anotherUser?.photoUrl}
			/>
		</Box>
	);
};
