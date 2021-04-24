import { Box, Container, Typography } from '@material-ui/core';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../components/Loader';
import { NavigationPanel } from '../components/navigation/NavigationPanel';
import { Post } from '../components/post/Post';
import { fetchPosts } from '../store/posts/postsActions';
import {
	selectPosts,
	selectPostsLoading,
	selectUser,
} from '../store/selectors';
import { getUser } from '../store/user/userActions';

export const SavedPostsPage = () => {
	const dispatch = useDispatch();

	const user = useSelector(selectUser);
	const posts = useSelector(selectPosts).filter((post) =>
		user?.savedPosts?.includes(post._id)
	);
	const loading = useSelector(selectPostsLoading);

	useEffect(() => {
		if (!user?._id) {
			dispatch(getUser());
		}

		if (posts.length === 0) {
			dispatch(fetchPosts());
		}
	}, [dispatch, posts.length, user?._id]);

	return (
		<Box component='section'>
			<NavigationPanel title='Сохранненые посты' />
			<Container>
				{posts.length === 0 ? (
					<Typography
						component='h3'
						style={{ color: '#ccc', textAlign: 'center', marginTop: '2rem' }}>
						Нет сохранненых постов
					</Typography>
				) : loading ? (
					<Loader />
				) : (
					<Box component='div'>
						{posts.map((post) => (
							<Post post={post} id={post._id} key={post._id} />
						))}
					</Box>
				)}
			</Container>
		</Box>
	);
};
