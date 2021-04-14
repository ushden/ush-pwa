import { Box, Container } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { Loader } from '../components/Loader';
import { NavigationPanel } from '../components/navigation/NavigationPanel';
import { Post } from '../components/post/Post';
import { useUserState } from '../hooks/useUserState';
import { RootState } from '../store/rootReducer';

export const MyPostsPage = () => {
	const user = useUserState();

	const posts = useSelector((state: RootState) =>
		state.posts.posts.filter((post) => post.user._id === user?.uid)
	);
	const loading = useSelector((state: RootState) => state.posts.postLoading);

	return (
		<Box component='section'>
			<NavigationPanel title='Мои посты' />
			{loading ? (
				<Loader />
			) : (
				<Container>
					{posts.map((post) => (
						<Post post={post} id={post._id} key={post._id} />
					))}
				</Container>
			)}
		</Box>
	);
};
