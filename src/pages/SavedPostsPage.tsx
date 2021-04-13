import { Box, Container } from '@material-ui/core';
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

	const savePostsId = useSelector(
		(state: RootState) => state.user.user.savedPosts
	);
	const posts = useSelector((state: RootState) =>
		state.posts.posts.filter((post) => savePostsId?.includes(post._id))
	);
	const loading = useSelector((state: RootState) => state.posts.postLoading);

	useEffect(() => {
		dispatch(getUser());
		dispatch(fetchPosts());
	}, [dispatch]);

	return (
		<Box component='section'>
			<NavigationPanel title='Сохранненые посты' />
			<Container>
				{loading ? (
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
