import { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { NavigationPanel } from '../components/navigation/NavigationPanel';
import { Modal } from '../components/ImageModal';
import { fetchSubscriptions, getUser } from '../store/user/userActions';
import { Post } from '../components/post/Post';
import {
	selectPosts,
	selectSubscribeOn,
	selectUser,
	selectUserFollowers,
	selectUsers,
} from '../store/selectors';
import { ProfileBody } from '../components/usersPage/ProfileBody';
import { ProfileHeader } from '../components/usersPage/ProfileHeader';
import { fetchPosts } from '../store/posts/postsActions';
import { firestore } from '../firebase';
import { USERS } from '../constants/constants';
import { SubscribeListModal } from '../components/SubscribeListModal';
import { fetchUsers } from '../store/users/usersActions';
import { FollowersListModal } from '../components/FollowersListModal';

export const ProfilePage = () => {
	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	const users = useSelector(selectUsers);
	const subscribeOn = useSelector(selectSubscribeOn);
	const followMe = useSelector(selectUserFollowers);

	const subscribeListUsers = users.filter((user) =>
		subscribeOn?.includes(user._id)
	);

	const followersUserList = users.filter((user) =>
		followMe?.includes(user._id)
	);

	const posts = useSelector(selectPosts).filter(
		(post) => post.user._id === user._id
	);

	const rating = posts.reduce((acc, el) => {
		if (el.rating) {
			return acc + el.rating;
		}

		return 0;
	}, 0);
	const subscribs = user.subscribs;
	const followers = user.followers;

	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const [modalSubscirbeVisible, setModalSubscirbeVisible] = useState<boolean>(
		false
	);
	const [modalFollowersVisible, setModalFollowersVisible] = useState<boolean>(
		false
	);

	const handleToggleModal = () => {
		setModalVisible((visible) => !visible);
	};

	useEffect(() => {
		if (!user._id) {
			dispatch(getUser());
		}

		if (posts.length === 0) {
			dispatch(fetchPosts());
		}

		if (users.length === 0) {
			dispatch(fetchUsers());
		}
	}, [dispatch, posts.length, user._id, users.length]);

	useEffect(() => {
		if (user._id) {
			const unsubscribe = firestore
				.collection(USERS)
				.doc(user._id)
				.onSnapshot(() => {
					dispatch(getUser());
					dispatch(fetchSubscriptions());
				});

			return () => unsubscribe();
		}
	}, [dispatch, user._id]);

	const handleSubscribersListClick = () => {
		setModalSubscirbeVisible((visible) => !visible);
	};

	const handleFollowersModalVisible = () => {
		setModalFollowersVisible((visible) => !visible);
	};

	return (
		<Box component='section'>
			<NavigationPanel title='Профиль' />
			<SubscribeListModal
				visible={modalSubscirbeVisible}
				onClose={handleSubscribersListClick}
				users={subscribeListUsers}
			/>
			<FollowersListModal
				visible={modalFollowersVisible}
				onClose={handleFollowersModalVisible}
				users={followersUserList}
			/>
			<ProfileHeader
				onToggleModal={handleToggleModal}
				user={user}
				currentUserId={user._id}
			/>
			<ProfileBody
				posts={posts}
				rating={rating}
				subscribs={subscribs}
				followers={followers}
				onSubsribersClick={handleSubscribersListClick}
				onFollowersClick={handleFollowersModalVisible}
			/>
			<Box>
				{posts.map((post) => (
					<Post post={post} id={post._id} key={post._id} />
				))}
			</Box>
			<Modal
				visible={modalVisible}
				onCloseModal={handleToggleModal}
				photoUrl={user?.photoUrl}
			/>
		</Box>
	);
};
