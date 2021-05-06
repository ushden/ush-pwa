import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { NavigationPanel } from '../components/navigation/NavigationPanel';
import { Post } from '../components/post/Post';
import { fetchPost } from '../store/posts/postsActions';
import { Loader } from '../components/Loader';
import { Comment } from '../components/post/comment/Comment';
import { AddCommentForm } from '../components/post/comment/AddCommentForm';
import { addComment, fetchComments } from '../store/comments/commentsActions';
import { firestore } from '../firebase';
import { COMMENTS } from '../constants/constants';
import {
	fetchToken,
	sendNotification,
	SendNotificationParams,
} from '../api/notification';
import {
	selectComments,
	selectPost,
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

export const PostFull = () => {
	const { id }: { id: string } = useParams();
	const loadingPost = useSelector(selectPostsLoading);
	const user = useSelector(selectUser);
	const post = useSelector(selectPost);
	const comments = useSelector(selectComments).sort((a: any, b: any) => b - a);

	const classes = useStyles();
	const dispatch = useDispatch();

	const [comment, setComment] = useState<string>('');
	const [visibleEmoji, setVisibleEmoji] = useState<boolean>(false);

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

	const handleAddCommentBtnClick = async () => {
		try {
			dispatch(addComment(comment, id));

			const token = await fetchToken(post.user._id);

			if (token) {
				const payload: SendNotificationParams = {
					token,
					title: 'Новый комментарий!',
					body: `Под Вашим постом ${post.title} пользователь ${user.name} оставил комментарий!`,
					url: window.location.href,
				};

				await sendNotification(payload);
			}
		} catch (error) {
			console.error(error.code, error.message);
		}

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
					visibleEmoji={visibleEmoji}
					setVisibleEmoji={setVisibleEmoji}
				/>
			</Container>
		</Box>
	);
};
