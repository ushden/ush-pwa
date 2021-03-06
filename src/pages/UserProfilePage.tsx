import { Box, Typography } from '@material-ui/core';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';

import { NavigationPanel } from '../components/navigation/NavigationPanel';
import { createChat } from '../store/chats/chatActions';
import {
	getUser,
	subscribeOnUser,
	unsubscribeOnUser,
} from '../store/user/userActions';
import {
	selectAnotherUser,
	selectAnotherUserFollowers,
	selectPosts,
	selectSubscribeAnotherUser,
	selectUser,
	selectUsers,
} from '../store/selectors';
import { fetchAnotherUser, fetchUsers } from '../store/users/usersActions';
import { Chat } from '../store/types';
import { Modal } from '../components/ImageModal';
import { ProfileHeader } from '../components/usersPage/ProfileHeader';
import { ProfileBody } from '../components/usersPage/ProfileBody';
import { Post } from '../components/post/Post';
import { fetchToken, sendNotification } from '../api/notification';
import { SubscribeListModal } from '../components/SubscribeListModal';
import { FollowersListModal } from '../components/FollowersListModal';
import { UserInfo } from '../components/usersPage/UserInfo';
import { RatingModal } from '../components/RatingModal';

export const UserProfilePage = () => {
	const history = useHistory();
	const { id }: { id: string } = useParams();
	const dispatch = useDispatch();

	const anotherUser = useSelector(selectAnotherUser);
	const user = useSelector(selectUser);
	const users = useSelector(selectUsers);
	const subscribeOn = useSelector(selectSubscribeAnotherUser);
	const followMe = useSelector(selectAnotherUserFollowers);

	const isSubscribe = followMe?.includes(user._id);

	const userSubscribeList = users.filter((user) =>
		subscribeOn?.includes(user._id)
	);

	const followersList = users.filter((user) => followMe?.includes(user._id));

	const posts = useSelector(selectPosts).filter(
		(post) => post.user._id === anotherUser._id
	);

	const subscribs = anotherUser.subscribs;
	const followers = anotherUser.followers;

	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const [replaceChatId, setReplaceChatId] = useState<null | string>(null);
	const [visibleSubscribeModal, setVisibleSubscribeModal] =
		useState<boolean>(false);
	const [visibleFollowersModal, setVisibleFollowersModal] =
		useState<boolean>(false);
	const [ratingModalVisible, setRatingModalVisible] = useState<boolean>(false);

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
		dispatch(fetchAnotherUser(id));
	}, [dispatch, id]);

	useEffect(() => {
		if (!user._id) {
			dispatch(getUser());
		}

		if (users.length === 0) {
			dispatch(fetchUsers());
		}
	}, [dispatch, user._id, users.length]);

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

	const handleSubscribeClick = async () => {
		if (isSubscribe) {
			dispatch(unsubscribeOnUser(id));

			const token: string = await fetchToken(id);
			const payload = {
				token,
				title: `???????????????????????? ${user?.name} ?????????????????? ???? ??????!`,
				body: '?????? ???????????? ??????????????!',
				url: window.location.href,
			};

			await sendNotification(payload);
		} else {
			dispatch(subscribeOnUser(id));

			const token: string = await fetchToken(id);
			const payload = {
				token,
				title: `???????????????????????? ${user?.name} ???????????????????? ???? ??????!`,
				body: '?????????????????????? ?? ?????????? :)',
				url: window.location.href,
			};

			await sendNotification(payload);
		}
	};

	const handleSubscribersListClick = () => {
		setVisibleSubscribeModal((visible) => !visible);
	};

	const handleFollowersListClick = () => {
		setVisibleFollowersModal((visible) => !visible);
	};

	const handleRatingModalClick = () => {
		setRatingModalVisible((visible) => !visible);
	};

	return (
		<Box component='section'>
			<NavigationPanel title='' backButton={true} />
			<RatingModal
				visible={ratingModalVisible}
				onClose={handleRatingModalClick}
				rating={anotherUser.rating}
			/>
			<SubscribeListModal
				visible={visibleSubscribeModal}
				onClose={handleSubscribersListClick}
				users={userSubscribeList}
			/>
			<FollowersListModal
				visible={visibleFollowersModal}
				onClose={handleFollowersListClick}
				users={followersList}
			/>
			<ProfileHeader
				onToggleModal={handleToggleModal}
				user={anotherUser}
				currentUserId={user._id}
				onClickWrite={handleWriteToUser}
				onSubscribe={handleSubscribeClick}
				isSubscribe={isSubscribe}
			/>
			<UserInfo user={anotherUser} />
			<ProfileBody
				posts={posts}
				rating={anotherUser.rating}
				subscribs={subscribs}
				followers={followers}
				onSubsribersClick={handleSubscribersListClick}
				onFollowersClick={handleFollowersListClick}
				onRatingClick={handleRatingModalClick}
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
						?? ???????????????????????? ?????? ???????? ???????????? :)
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
