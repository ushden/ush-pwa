import { useEffect } from 'react';
import { Box } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { ChatContainer } from '../components/chats/ChatContainer';
import { NavigationPanel } from '../components/navigation/NavigationPanel';
import { getChatName } from '../utils/getChatInfo';
import { fetchChat } from '../store/chats/chatActions';
import { selectChat, selectUser } from '../store/selectors';
import { getUser } from '../store/user/userActions';
import { MessagesView } from '../components/chats/MessagesView';

interface ChatPageParams {
	id: string;
}
export const ChatPage = () => {
	const dispatch = useDispatch();
	const { id } = useParams<ChatPageParams>();
	const user = useSelector(selectUser);
	const chat = useSelector(selectChat);

	useEffect(() => {
		dispatch(fetchChat(id));
	}, [dispatch, id]);

	useEffect(() => {
		if (!user._id) {
			dispatch(getUser());
		}
	}, [dispatch, user._id]);

	return (
		<Box component='section'>
			<NavigationPanel title={getChatName(chat)} backButton />
			<ChatContainer>
				<MessagesView user={user} chatId={id} />
			</ChatContainer>
		</Box>
	);
};
