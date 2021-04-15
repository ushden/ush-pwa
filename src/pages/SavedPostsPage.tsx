import { Box, Container, Typography } from '@material-ui/core';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../components/Loader';
import { NavigationPanel } from '../components/navigation/NavigationPanel';
import { Post } from '../components/post/Post';
import { fetchPosts } from '../store/posts/postsActions';
import { RootState } from '../store/rootReducer';
import { getUser } from '../store/user/userActions';

export const SavedPostsPage = () => {
	const dispatch = useDispatch();

	const user = useSelector((state: RootState) => state.user.user);
	const posts = useSelector((state: RootState) =>
		state.posts.posts.filter((post) => user?.savedPosts?.includes(post._id))
	);
	const loading = useSelector((state: RootState) => state.posts.postLoading);

	useEffect(() => {
		if (user?._id === '') {
			dispatch(getUser());
		}

		if (posts.length === 0) {
			dispatch(fetchPosts());
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
							<Post post={post} id={post._id} />
						))}
					</Box>
				)}
			</Container>
		</Box>
	);
};
