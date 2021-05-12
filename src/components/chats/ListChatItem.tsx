import { Fragment } from 'react';
import {
	Divider,
	ListItem,
	ListItemAvatar,
	ListItemText,
	ListItemSecondaryAction,
	makeStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import { COLOR_PRIMARY } from '../../constants/constants';
import classNames from 'classnames';
import { Chat } from '../../store/types';
import { getChatAvatar, getChatName } from '../../utils/getChatInfo';
import { useLastMessage } from '../../hooks/useLastMessage';
import { Skeleton } from '@material-ui/lab';
import { ImageAvatar } from '../ImageAvatar';
import { useNewMessageState } from '../../hooks/useNewMessageState';

const useStyles = makeStyles({
	listIcon: {
		fontSize: '1.5rem',
		color: COLOR_PRIMARY,
	},
	link: {
		textDecoration: 'none',
		color: 'inherit',
	},
	skeletonLastMessage: {
		width: '70%',
	},
});

interface ListChatItemProps {
	chat: Chat;
}

export const ListChatItem = ({ chat }: ListChatItemProps) => {
	const classes = useStyles();
	const lastMessage = useLastMessage(chat._id);
	const chatName = getChatName(chat);
	const chatAvatar = getChatAvatar(chat);
	const { isHaveNewMessage, newMessageCount } = useNewMessageState(
		chat.users.firstUser._id,
		chat.users.secondUser._id,
		chat._id
	);

	const LastMessage = () => {
		if (lastMessage === undefined) {
			return <span>Нет сообщений</span>;
		}

		return lastMessage ? (
			<span>{lastMessage}</span>
		) : (
			<Skeleton variant='text' className={classes.skeletonLastMessage} />
		);
	};

	const NewMessageAlert = () => {
		return (
			<span
				style={{
					backgroundColor: COLOR_PRIMARY,
					padding: '0.2rem 0.5rem',
					color: '#fff',
					borderRadius: '0.5rem',
					fontSize: '0.7rem',
				}}>
				У вас {newMessageCount} новых сообщений
			</span>
		);
	};

	return (
		<Fragment>
			<Link
				to={{ pathname: `/chat/${chat._id}`, state: chat }}
				className={classNames(classes.link, 'anim-scale')}>
				<ListItem alignItems='flex-start' button className='anim-scale'>
					<ListItemAvatar className='anim-scale'>
						<ImageAvatar src={chatAvatar} alt={chatName} />
					</ListItemAvatar>
					{/* <ListItemText primary={chatName} secondary={setLastMessage()} /> */}
					<ListItemText
						primary={chatName}
						secondary={isHaveNewMessage ? <NewMessageAlert /> : <LastMessage />}
					/>
					<ListItemSecondaryAction>
						<SendOutlinedIcon
							className={classNames(classes.listIcon, 'anim-scale')}
						/>
					</ListItemSecondaryAction>
				</ListItem>
			</Link>
			<Divider variant='inset' component='li' className='anim-scale' />
		</Fragment>
	);
};
