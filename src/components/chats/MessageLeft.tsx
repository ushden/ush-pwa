import {
	Avatar,
	ListItem,
	ListItemAvatar,
	ListItemText,
	makeStyles,
	Typography,
} from '@material-ui/core';
import classNames from 'classnames';
import { FC } from 'react';
import { Message } from '../../store/types';

const useStyles = makeStyles({
	bubble: {
		paddingLeft: '0.3rem',
	},
	avatarWrap: {
		width: '2rem',
		minWidth: '2.3rem',
	},
	avatar: {
		width: '2rem',
		height: '2rem',
	},
	text: {
		backgroundColor: 'rgba(0, 0, 0, 0.05)',
		color: '#000',
		borderRadius: '1rem',
		padding: '0.5rem',
		paddingRight: '1rem',
		wordWrap: 'break-word',
	},
	messageInfo: {
		display: 'flex',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'flex-start',
		textAlign: 'left',
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
		backgroundColor: 'rgba(0, 0, 0, 0.05)',
		padding: '0.2rem',
	},
});

interface MessageProps {
	message: Message;
}

export const MessageLeft: FC<MessageProps> = ({ message }) => {
	const classes = useStyles();

	const renderImageMessage = () => {
		return (
			<Typography className={classes.imageMessage}>
				<img src={message.image} alt={message.user.name} />
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
			button>
			<ListItemAvatar className={classes.avatarWrap}>
				<Avatar
					src={message.user.photoUrl}
					className={classes.avatar}
					alt={message.user.name}
				/>
			</ListItemAvatar>
			<ListItemText className={classes.messageInfo}>
				<Typography component='span' className={classes.name}>
					{message.user.name}
				</Typography>
				{message.image ? renderImageMessage() : renderTextMessage()}
				<Typography component='span' className={classes.data}>
					{message.createdAt}
				</Typography>
			</ListItemText>
		</ListItem>
	);
};
