import { Box, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../components/Loader';
import { FAB } from '../components/FAB';
import { NavigationPanel } from '../components/navigation/NavigationPanel';
import { Post } from '../components/post/Post';
// import { POSTS } from '../constants/constants';
// import { firestore } from '../firebase';
import { fetchPosts } from '../store/posts/postsActions';
import { RootState } from '../store/rootReducer';
import { getUser } from '../store/user/userActions';

const useStyles = makeStyles({
	container: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
});

export const MainPage = () => {
	const dispatch = useDispatch();
	const classes = useStyles();

	const posts = useSelector((state: RootState) => state.posts.posts);
	const loading = useSelector((state: RootState) => state.posts.postLoading);
	const user = useSelector((state: RootState) => state.user.user);

	useEffect(() => {
		if (posts.length === 0) {
			dispatch(fetchPosts());
		}

		if (!user._id) {
			dispatch(getUser());
		}
	}, [dispatch, posts.length, user._id]);

	return (
		<Box component='section'>
			<NavigationPanel title='Посты' />
			<Container className={classes.container}>
				{loading ? (
					<Loader />
				) : (
					<Box component='div'>
						{posts.map((post) => (
							<Post key={post._id} post={post} id={post._id} />
						))}
					</Box>
				)}
			</Container>
			<FAB />
		</Box>
	);
};
