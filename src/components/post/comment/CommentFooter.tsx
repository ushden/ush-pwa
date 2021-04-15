import { Box, IconButton } from '@material-ui/core';
import Smile from '@material-ui/icons/SentimentSatisfiedOutlined';
import Sad from '@material-ui/icons/SentimentDissatisfiedOutlined';
import Dead from '@material-ui/icons/SentimentVeryDissatisfiedOutlined';
import Anime from '@material-ui/icons/SentimentVerySatisfiedOutlined';
import { makeStyles } from '@material-ui/styles';
import { EmojiCountType, EmojiType } from './Comment';
import { COLOR_PRIMARY } from '../../../constants/constants';
import classNames from 'classnames';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles({
	btn: {
		padding: 0,
	},
	footer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	pickEmoji: {
		color: COLOR_PRIMARY,
	},
	skeletonEmoji: {},
});

interface FooterProps {
	handleSmileClick: () => void;
	handleSadClick: () => void;
	handleDeadClick: () => void;
	handleAnimeClick: () => void;
	emoji: EmojiType;
	commentCount: EmojiCountType;
}

export const CommentFooter = (props: FooterProps) => {
	const classes = useStyles();
	const { emoji, commentCount } = props;

	return (
		<Box component='div'>
			{emoji.anime === null ? (
				<Skeleton variant='text' className={classes.skeletonEmoji} />
			) : (
				<Box component='div' className={classes.footer}>
					<IconButton
						className={classNames(
							classes.btn,
							emoji.smile && classes.pickEmoji
						)}
						onClick={props.handleSmileClick}>
						<Smile />
						<Box component='span'>{commentCount.smile}</Box>
					</IconButton>
					<IconButton
						className={classNames(classes.btn, emoji.sad && classes.pickEmoji)}
						onClick={props.handleSadClick}>
						<Sad />
						<Box component='span'>{commentCount.sad}</Box>
					</IconButton>
					<IconButton
						className={classNames(classes.btn, emoji.dead && classes.pickEmoji)}
						onClick={props.handleDeadClick}>
						<Dead />
						<Box component='span'>{commentCount.dead}</Box>
					</IconButton>
					<IconButton
						className={classNames(
							classes.btn,
							emoji.anime && classes.pickEmoji
						)}
						onClick={props.handleAnimeClick}>
						<Anime />
						<Box component='span'>{commentCount.anime}</Box>
					</IconButton>
				</Box>
			)}
		</Box>
	);
};
