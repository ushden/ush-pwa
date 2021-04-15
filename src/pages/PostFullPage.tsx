import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { NavigationPanel } from '../components/navigation/NavigationPanel';
import { Post } from '../components/post/Post';
import { fetchPost } from '../store/posts/postsActions';
import { RootState } from '../store/rootReducer';
import { Loader } from '../components/Loader';
import { Comment } from '../components/post/comment/Comment';
import { AddCommentForm } from '../components/post/comment/AddCommentForm';
import { addComment, fetchComments } from '../store/comments/commentsActions';
import { firestore } from '../firebase';
import { COMMENTS } from '../constants/constants';

const useStyles = makeStyles({
	container: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
});

export const PostFull = () => {
	const { id }: { id: string } = useParams();
	const loadingPost = useSelector(
		(state: RootState) => state.posts.postLoading
	);
	const post = useSelector((state: RootState) => state.posts.post);
	const comments = useSelector((state: RootState) =>
		state.comments.comments.sort((a: any, b: any) => b - a)
	);

	const classes = useStyles();
	const dispatch = useDispatch();

	const [comment, setComment] = useState<string>('');

	useEffect(() => {
		dispatch(fetchPost(id));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		const unsubscribe = firestore
			.collection(COMMENTS)
			.doc(id)
			.onSnapshot(() => {
				dispatch(fetchComments(id));
			});

		return () => unsubscribe();
	}, [dispatch, id]);

	const onEmojiClickHandle = (_: any, emojiObject: any) => {
		setComment((text) => `${text}${emojiObject.emoji}`);
	};

	const handleAddCommentBtnClick = () => {
		dispatch(addComment(comment, id));
		setComment('');
	};

	return (
		<Box component='section'>
			<NavigationPanel title={post.title} backButton={true} />
			<Container className={classes.container}>
				{loadingPost ? <Loader /> : <Post post={post} id={id} />}
				{comments.length === 0 ? (
					<Box
						component='div'
						style={{ color: '#ccc', marginBottom: '1rem', marginTop: '1rem' }}>
						<Typography component='p'>Добавь первый комментарий :)</Typography>
					</Box>
				) : (
					comments.map((comment) => (
						<Comment key={comment._id} comment={comment} />
					))
				)}
				<AddCommentForm
					onEmojiClickHandle={onEmojiClickHandle}
					handleAddCommentBtnClick={handleAddCommentBtnClick}
					comment={comment}
					setComment={setComment}
				/>
			</Container>
		</Box>
	);
};
