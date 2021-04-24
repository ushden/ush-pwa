import classNames from 'classnames';
import { Container, Divider, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { useEffect, useState } from 'react';
import { useFirestoreSubscribe } from '../../hooks/useFirestoreSubscribe';
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
import { auth } from '../../firebase';
import { PostHeader } from './PostHeader';
import { PostBody } from './PostBody';
import { PostFooter } from './PostFooter';
import { Modal } from '../ImageModal';

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

	const ratingData = useFirestoreSubscribe(RATING, id);
	const ratingAndCommentCountData = useFirestoreSubscribe(POSTS, id);
	const savedPostData = useFirestoreSubscribe(USERS, user?.uid);

	useEffect(() => {
		setLike(ratingData?.likes.includes(user?.uid));
		setDislike(ratingData?.dislike.includes(user?.uid));
	}, [ratingData?.dislike, ratingData?.likes, user?.uid]);

	useEffect(() => {
		setRatingCount(ratingAndCommentCountData?.rating);
		setCommentsCount(ratingAndCommentCountData?.comments);
	}, [ratingAndCommentCountData?.comments, ratingAndCommentCountData?.rating]);

	useEffect(() => {
		setIsSavePost(savedPostData?.savedPosts.includes(id));
	}, [id, savedPostData?.savedPosts]);

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

	const postHeaderProps = {
		post,
		anchorEl,
		handleMenuOpenClick,
		handleMenuCloseClick,
		handleDeletePostClick,
		handleVisibleModalAvatar,
		openModalAvatar,
	};

	const postFooterProps = {
		post,
		like,
		ratingCount,
		commentsCount,
		dislike,
		handleLikeClick,
		handleDislikeClick,
		handleClickShare,
		isSavePost,
		handleClickSavePost,
	};

	return (
		<Paper
			component='article'
			elevation={3}
			className={classNames(classes.post, 'anim-opacity')}>
			<Container component='div' className={classes.container}>
				<PostHeader {...postHeaderProps} />
				<PostBody post={post} onOpenModalHandle={handleVisibleModal} />
				<Divider />
				<PostFooter {...postFooterProps} />
			</Container>
			<Modal
				visible={openModal}
				onCloseModal={handleVisibleModal}
				photoUrl={post.image}
			/>
		</Paper>
	);
};
