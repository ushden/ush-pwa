import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { NavigationPanel } from '../components/navigation/NavigationPanel';
import { Post } from '../components/post/Post';
import { fetchPost } from '../store/posts/postsActions';
import { RootState } from '../store/rootReducer';
import { Loader } from '../components/Loader';

const useStyles = makeStyles({
	container: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
});

export const PostFull = () => {
	const { id }: { id: string } = useParams();
	const loading = useSelector((state: RootState) => state.posts.postLoading);
	const post = useSelector((state: RootState) => state.posts.post);

	const classes = useStyles();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchPost(id));
	}, [dispatch, id]);

	return (
		<Box component='section'>
			<NavigationPanel title={post.title} backButton={true} />
			<Container className={classes.container}>
				{loading ? <Loader /> : <Post post={post} id={id} />}
			</Container>
		</Box>
	);
};
