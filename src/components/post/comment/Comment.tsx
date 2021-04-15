import classNames from 'classnames';
import { Box, Divider, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { CommentHeader } from './CommentHeader';
import { CommentBody } from './CommentBody';
import { CommentFooter } from './CommentFooter';
import { CommentType } from '../../../store/types';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
	addCommentEmoji,
	deleteComment,
} from '../../../store/comments/commentsActions';
import { ANIME, DEAD, EMOJI, SAD, SMILE } from '../../../constants/constants';
import { firestore } from '../../../firebase';

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
		firestore
			.collection(EMOJI)
			.doc(comment._id)
			.onSnapshot((doc) => {
				if (doc.exists) {
					const data = doc.data();

					setEmoji({
						smile: data?.smile.includes(comment.user._id),
						sad: data?.sad.includes(comment.user._id),
						dead: data?.dead.includes(comment.user._id),
						anime: data?.anime.includes(comment.user._id),
					});

					setCommentCount({
						smile: data?.smile.length,
						sad: data?.sad.length,
						dead: data?.dead.length,
						anime: data?.anime.length,
					});
				}
			});
	}, [comment._id, comment.user._id]);

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
