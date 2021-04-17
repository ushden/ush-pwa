import classNames from 'classnames';
import { Container, Divider, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { POSTS, RATING, USERS } from '../../constants/constants';
import { PostType } from '../../store/types';
import { sharePost } from '../../api/share';
import {
	deletePost,
	dislikePost,
	likePost,
	savePost,
	unSavePost,
} from '../../store/posts/postsActions';
import { auth, firestore } from '../../firebase';
import { PostHeader } from './PostHeader';
import { PostBody } from './PostBody';
import { PostFooter } from './PostFooter';
import { Modal } from '../Modal';

const useStyles = makeStyles({
	post: {
		padding: '0.5rem 0',
		margin: '0.6rem 0',
		maxWidth: 600,
		width: '100%',
	},
	container: {
		paddingLeft: '0.5rem',
		paddingRight: '0.5rem',
	},
});

interface PostPropsType {
	post: PostType;
	id: string;
}

export const Post = ({ post, id }: PostPropsType) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const user = auth.currentUser;

	const [like, setLike] = useState<boolean>(false);
	const [dislike, setDislike] = useState<boolean>(false);
	const [ratingCount, setRatingCount] = useState<number | null>(null);
	const [commentsCount, setCommentsCount] = useState<number | null>(null);

	const [isSavePost, setIsSavePost] = useState<boolean>(false);

	const [openModal, setOpenModal] = useState<boolean>(false);
	const [openModalAvatar, setOpenModalAvatar] = useState<boolean>(false);

	useEffect(() => {
		const unsubscribe = firestore
			.collection(RATING)
			.doc(id)
			.onSnapshot((doc) => {
				if (doc.exists) {
					const data = doc.data();

					setLike(data?.likes?.includes(user?.uid));
					setDislike(data?.dislike?.includes(user?.uid));
				}
			});

		return () => unsubscribe();
	}, [id, user?.uid]);

	useEffect(() => {
		const unsubscribe = firestore
			.collection(POSTS)
			.doc(id)
			.onSnapshot((doc) => {
				if (doc.exists) {
					const data = doc.data();

					setRatingCount(data?.rating);
				}
			});
		return () => unsubscribe();
	}, [id]);

	useEffect(() => {
		const unsubscribe = firestore
			.collection(POSTS)
			.doc(id)
			.onSnapshot((doc) => {
				if (doc.exists) {
					const data = doc.data();

					setCommentsCount(data?.comments);
				}
			});
		return () => unsubscribe();
	}, [id]);

	useEffect(() => {
		const unsubscribe = firestore
			.collection(USERS)
			.doc(user?.uid)
			.onSnapshot((doc) => {
				if (doc.exists) {
					const data = doc.data();

					setIsSavePost(data?.savedPosts?.includes(id));
				}
			});

		return () => unsubscribe();
	}, [id, user?.uid]);

	const handleClickShare = () => {
		const data = {
			title: post.title,
			text: post.description,
			id: post._id || id,
		};

		sharePost(data);
	};

	const handleLikeClick = () => {
		dispatch(likePost(post._id || id));
	};

	const handleDislikeClick = () => {
		dispatch(dislikePost(post._id || id));
	};

	const handleMenuOpenClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuCloseClick = () => {
		setAnchorEl(null);
	};

	const handleDeletePostClick = () => {
		setAnchorEl(null);

		dispatch(deletePost(id));
	};

	const handleClickSavePost = () => {
		if (isSavePost) {
			dispatch(unSavePost(id));
		} else {
			dispatch(savePost(id));
		}
	};

	const handleVisibleModal = () => {
		setOpenModal((visible) => !visible);
	};

	const handleVisibleModalAvatar = () => {
		setOpenModalAvatar((visible) => !visible);
	};

	return (
		<Paper
			component='article'
			elevation={3}
			className={classNames(classes.post, 'anim-opacity')}>
			<Container component='div' className={classes.container}>
				<PostHeader
					post={post}
					anchorEl={anchorEl}
					handleMenuOpenClick={handleMenuOpenClick}
					handleMenuCloseClick={handleMenuCloseClick}
					handleDeletePostClick={handleDeletePostClick}
					handleVisibleModal={handleVisibleModalAvatar}
					openModal={openModalAvatar}
				/>
				<PostBody post={post} onOpenModalHandle={handleVisibleModal} />
				<Divider />
				<PostFooter
					post={post}
					like={like}
					ratingCount={ratingCount}
					commentsCount={commentsCount}
					dislike={dislike}
					handleLikeClick={handleLikeClick}
					handleDislikeClick={handleDislikeClick}
					handleClickShare={handleClickShare}
					savePost={isSavePost}
					handleClickSavePost={handleClickSavePost}
				/>
			</Container>
			<Modal
				visible={openModal}
				onCloseModal={handleVisibleModal}
				photoUrl={post.image}
			/>
		</Paper>
	);
};
