import { Fragment } from 'react';
import {
	Divider,
	ListItem,
	ListItemAvatar,
	ListItemText,
	ListItemSecondaryAction,
	Avatar,
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

	const setLastMessage = () => {
		if (lastMessage === undefined) {
			return 'Нет сообщений';
		}

		return lastMessage ? (
			lastMessage
		) : (
			<Skeleton variant='text' className={classes.skeletonLastMessage} />
		);
	};
	return (
		<Fragment>
			<Link
				to={{ pathname: `/chat/${chat._id}`, state: chat }}
				className={classNames(classes.link, 'anim-scale')}>
				<ListItem alignItems='flex-start' button className='anim-scale'>
					<ListItemAvatar className='anim-scale'>
						<Avatar alt={getChatName(chat)} src={getChatAvatar(chat)} />
					</ListItemAvatar>
					<ListItemText
						primary={getChatName(chat)}
						secondary={setLastMessage()}
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
