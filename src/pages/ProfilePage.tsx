import { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { NavigationPanel } from '../components/navigation/NavigationPanel';
import { Modal } from '../components/ImageModal';
import { fetchSubscriptions, getUser } from '../store/user/userActions';
import { Post } from '../components/post/Post';
import { selectPosts, selectUser } from '../store/selectors';
import { ProfileBody } from '../components/usersPage/ProfileBody';
import { ProfileHeader } from '../components/usersPage/ProfileHeader';
import { fetchPosts } from '../store/posts/postsActions';
import { firestore } from '../firebase';
import { USERS } from '../constants/constants';

export const ProfilePage = () => {
	const dispatch = useDispatch();
	const user = useSelector(selectUser);
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
	}, [dispatch, posts.length, user._id]);

	useEffect(() => {
		const unsubscribe = firestore
			.collection(USERS)
			.doc(user._id)
			.onSnapshot(() => {
				dispatch(getUser());
				dispatch(fetchSubscriptions());
			});

		return () => unsubscribe();
	}, [dispatch, user._id]);

	return (
		<Box component='section'>
			<NavigationPanel title='Профиль' />
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
