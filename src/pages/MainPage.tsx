import { Box, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getToken, setToken } from '../api/notification';
import { Loader } from '../components/Loader';
import { FAB } from '../components/FAB';
import { NavigationPanel } from '../components/navigation/NavigationPanel';
import { Post } from '../components/post/Post';
import { fetchPosts } from '../store/posts/postsActions';
import { getUser } from '../store/user/userActions';
import {
	selectPosts,
	selectPostsLoading,
	selectUser,
} from '../store/selectors';

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

	const posts = useSelector(selectPosts);
	const loading = useSelector(selectPostsLoading);
	const user = useSelector(selectUser);

	useEffect(() => {
		(async () => {
			const token = await getToken();

			if (token) {
				return await setToken(token);
			}
		})();
	}, [dispatch]);

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
