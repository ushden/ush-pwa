import { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { NavigationPanel } from '../components/navigation/NavigationPanel';
import { Modal } from '../components/ImageModal';
import { getUser } from '../store/user/userActions';
import { Post } from '../components/post/Post';
import { selectPosts, selectUser } from '../store/selectors';
import { ProfileBody } from '../components/usersPage/ProfileBody';
import { ProfileHeader } from '../components/usersPage/ProfileHeader';
import { fetchPosts } from '../store/posts/postsActions';

export const ProfilePage = () => {
	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	const posts = useSelector(selectPosts).filter(
		(post) => post.user._id === user._id
	);
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

	return (
		<Box component='section'>
			<NavigationPanel title='Профиль' />
			<ProfileHeader
				onToggleModal={handleToggleModal}
				user={user}
				currentUserId={user._id}
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
				photoUrl={user?.photoUrl}
			/>
		</Box>
	);
};
