import {
	Avatar,
	ListItem,
	ListItemAvatar,
	ListItemText,
	makeStyles,
	Typography,
} from '@material-ui/core';
import classNames from 'classnames';
import { FC, memo } from 'react';

import { COLOR_PRIMARY } from '../../constants/constants';
import { Message } from '../../store/types';

const useStyles = makeStyles({
	bubble: {
		paddingRight: '0.3rem',
	},
	avatarWrap: {
		width: '2rem',
		minWidth: '2rem',
		marginLeft: '0.3rem',
	},
	avatar: {
		width: '2rem',
		height: '2rem',
	},
	text: {
		backgroundColor: COLOR_PRIMARY,
		color: '#fff',
		borderRadius: '1rem',
		padding: '0.5rem',
		paddingLeft: '1rem',
		wordWrap: 'break-word',
		textAlign: 'left',
	},
	messageInfo: {
		display: 'flex',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'flex-end',
		textAlign: 'right',
	},
	name: {
		fontWeight: 'bolder',
	},
	data: {
		fontWeight: 'lighter',
		fontSize: '0.7rem',
		paddingTop: '0.1rem',
	},
	imageMessage: {
		backgroundColor: COLOR_PRIMARY,
		padding: '0.2rem',
	},
	image: {
		maxWidth: '100%',
		objectFit: 'contain',
	},
});

interface MessageProps {
	message: Message;
	onMessageClick: (_: any, m: Message) => void;
}

export const MessageRight: FC<MessageProps> = memo(
	({ message, onMessageClick }) => {
		const classes = useStyles();

		const renderImageMessage = () => {
			return (
				<Typography className={classes.imageMessage}>
					<img
						src={message.image}
						alt={message.user.name}
						className={classes.image}
					/>
				</Typography>
			);
		};

		const renderTextMessage = () => {
			return <Typography className={classes.text}>{message.text}</Typography>;
		};

		return (
			<ListItem
				className={classNames(classes.bubble, 'anim-scale')}
				alignItems='center'
				onClick={(e) => onMessageClick(e, message)}
				button>
				<ListItemText className={classes.messageInfo}>
					<Typography component='span' className={classes.name}>
						{message.user.name}
					</Typography>
					{message.image ? renderImageMessage() : renderTextMessage()}
					<Typography component='span' className={classes.data}>
						{' '}
						{message.createdAt}
					</Typography>
				</ListItemText>
				<ListItemAvatar className={classes.avatarWrap}>
					<Avatar
						src={message.user.photoUrl}
						alt={message.user.name}
						className={classes.avatar}
					/>
				</ListItemAvatar>
			</ListItem>
		);
	}
);
