import { useEffect } from 'react';
import { Box, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import TimeAgo from 'timeago-react';

import { ChatContainer } from '../components/chats/ChatContainer';
import { NavigationPanel } from '../components/navigation/NavigationPanel';
import { fetchChat } from '../store/chats/chatActions';
import { selectAnotherUser, selectChat, selectUser } from '../store/selectors';
import { getUser } from '../store/user/userActions';
import { MessagesView } from '../components/chats/MessagesView';
import { fetchAnotherUser } from '../store/users/usersActions';
import { useUserStatus } from '../hooks/useUserStatus';

interface ChatPageParams {
	id: string;
}
export const ChatPage = () => {
	const dispatch = useDispatch();
	const { id } = useParams<ChatPageParams>();
	const user = useSelector(selectUser);
	const chat = useSelector(selectChat);
	const anotherUser = useSelector(selectAnotherUser);
	const status = useUserStatus(anotherUser._id);

	const firstUser = chat?.users?.firstUser;
	const secondUser = chat?.users?.secondUser;
	const recipient = firstUser.name === user?.name ? secondUser : firstUser;

	useEffect(() => {
		dispatch(fetchChat(id));
	}, [dispatch, id]);

	useEffect(() => {
		if (!user._id) {
			dispatch(getUser());
		}
	}, [dispatch, user._id]);

	useEffect(() => {
		if (recipient._id) {
			dispatch(fetchAnotherUser(recipient._id));
		}
	}, [dispatch, recipient._id]);

	const getChatName = () => {
		return (
			<Box>
				<Typography component='h5' style={{ marginBottom: 0 }}>
					{recipient.name}
				</Typography>
				{status === 'online' ? (
					<Typography style={{ color: 'green', fontSize: '0.8rem' }}>
						Online
					</Typography>
				) : anotherUser.isLogIn?.lastChanged ? (
					<Typography
						component='p'
						style={{ color: '#ccc', fontSize: '0.8rem' }}>
						<TimeAgo datetime={anotherUser.isLogIn.lastChanged} />
					</Typography>
				) : (
					''
				)}
			</Box>
		);
	};

	return (
		<Box component='section'>
			<NavigationPanel title={getChatName()} backButton />
			<ChatContainer>
				<MessagesView user={user} chatId={id} />
			</ChatContainer>
		</Box>
	);
};
