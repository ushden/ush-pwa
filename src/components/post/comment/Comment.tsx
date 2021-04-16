import classNames from 'classnames';
import { Box, Divider, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { CommentHeader } from './CommentHeader';
import { CommentBody } from './CommentBody';
import { CommentFooter } from './CommentFooter';
import { CommentType } from '../../../store/types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	addCommentEmoji,
	deleteComment,
} from '../../../store/comments/commentsActions';
import { ANIME, DEAD, EMOJI, SAD, SMILE } from '../../../constants/constants';
import { firestore } from '../../../firebase';
import { RootState } from '../../../store/rootReducer';
import { getUser } from '../../../store/user/userActions';

const useStyles = makeStyles({
	comment: {
		width: '100%',
		padding: '0.3rem',
		marginBottom: '0.4rem',
	},
});

interface CommentPropsType {
	comment: CommentType;
}

export interface EmojiType {
	smile: null | boolean;
	sad: null | boolean;
	dead: null | boolean;
	anime: null | boolean;
}
export interface EmojiCountType {
	smile: number;
	sad: number;
	dead: number;
	anime: number;
}

export const Comment = ({ comment }: CommentPropsType) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const user = useSelector((state: RootState) => state.user.user);

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [emoji, setEmoji] = useState<EmojiType>({
		smile: null,
		sad: null,
		dead: null,
		anime: null,
	});
	const [commentCount, setCommentCount] = useState({
		smile: 0,
		sad: 0,
		dead: 0,
		anime: 0,
	});

	useEffect(() => {
		if (user._id === '') {
			dispatch(getUser());
		}
	}, [dispatch, user._id]);

	useEffect(() => {
		firestore
			.collection(EMOJI)
			.doc(comment._id)
			.get()
			.then((doc) => {
				const data = doc.data();

				setEmoji({
					smile: data?.smile.includes(user._id),
					sad: data?.sad.includes(user._id),
					dead: data?.dead.includes(user._id),
					anime: data?.anime.includes(user._id),
				});

				setCommentCount({
					smile: data?.smile.length || 0,
					sad: data?.sad.length || 0,
					dead: data?.dead.length || 0,
					anime: data?.anime.length || 0,
				});
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		const unsubscribe = firestore
			.collection(EMOJI)
			.doc(comment._id)
			.onSnapshot((doc) => {
				if (doc.exists) {
					const data = doc.data();

					setEmoji({
						smile: data?.smile.includes(user._id),
						sad: data?.sad.includes(user._id),
						dead: data?.dead.includes(user._id),
						anime: data?.anime.includes(user._id),
					});

					setCommentCount({
						smile: data?.smile.length || 0,
						sad: data?.sad.length || 0,
						dead: data?.dead.length || 0,
						anime: data?.anime.length || 0,
					});
				}
			});

		return () => unsubscribe();
	}, [comment._id, user._id]);

	const handleDeleteComment = () => {
		dispatch(deleteComment(comment));
	};

	const handleMenuToggle = (event: React.MouseEvent<HTMLElement>) => {
		if (anchorEl) {
			setAnchorEl(null);
		} else {
			setAnchorEl(event.currentTarget);
		}
	};

	const handleSmileClick = () => {
		dispatch(addCommentEmoji(comment, SMILE));
	};

	const handleSadClick = () => {
		dispatch(addCommentEmoji(comment, SAD));
	};

	const handleDeadClick = () => {
		dispatch(addCommentEmoji(comment, DEAD));
	};

	const handleAnimeClick = () => {
		dispatch(addCommentEmoji(comment, ANIME));
	};

	return (
		<Paper
			component='section'
			className={classNames(classes.comment, 'anim-transform')}>
			<Box component='article'>
				<CommentHeader
					handleDeleteComment={handleDeleteComment}
					handleMenuToggle={handleMenuToggle}
					anchorEl={anchorEl}
					avatar={comment.user.photoUrl}
					name={comment.user.name}
					createAt={comment.createAt}
				/>
				<Divider style={{ marginTop: '0.3rem', marginBottom: '0.3rem' }} />
				<CommentBody comment={comment.text} />
				<Divider style={{ marginTop: '0.3rem', marginBottom: '0.3rem' }} />
				<CommentFooter
					handleAnimeClick={handleAnimeClick}
					handleSmileClick={handleSmileClick}
					handleSadClick={handleSadClick}
					handleDeadClick={handleDeadClick}
					emoji={emoji}
					commentCount={commentCount}
				/>
			</Box>
		</Paper>
	);
};
