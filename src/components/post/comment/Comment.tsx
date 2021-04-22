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
import { RootState } from '../../../store/rootReducer';
import { getUser } from '../../../store/user/userActions';
import { useFirestoreSubscribe } from '../../../hooks/useFirestoreSubscribe';

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
	const emojiData = useFirestoreSubscribe(EMOJI, comment._id);

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
		setEmoji({
			smile: emojiData?.smile.includes(user._id),
			sad: emojiData?.sad.includes(user._id),
			dead: emojiData?.dead.includes(user._id),
			anime: emojiData?.anime.includes(user._id),
		});

		setCommentCount({
			smile: emojiData?.smile.length || 0,
			sad: emojiData?.sad.length || 0,
			dead: emojiData?.dead.length || 0,
			anime: emojiData?.anime.length || 0,
		});
	}, [
		emojiData?.anime,
		emojiData?.dead,
		emojiData?.sad,
		emojiData?.smile,
		user._id,
	]);

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
