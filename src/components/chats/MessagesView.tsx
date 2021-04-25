import { CardContent, Card, List } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import {
	ChangeEvent,
	FC,
	ReactElement,
	useEffect,
	useRef,
	useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchToken, sendNotification } from '../../api/notification';
import { CHATS, MESSAGES } from '../../constants/constants';
import { firestore } from '../../firebase';
import {
	deleteMessage,
	fetchMessages,
	sendImageMessage,
	sendMessage,
} from '../../store/chats/chatActions';
import {
	selectChat,
	selectChatsLoading,
	selectMessages,
} from '../../store/selectors';
import { Message, User } from '../../store/types';
import { Loader } from '../Loader';
import { MessageLeft } from './MessageLeft';
import { MessageModal } from './MessageModal';
import { MessageRight } from './MessageRight';

import { SendMessageForm } from './SendMessageForm';

const useStyles = makeStyles({
	view: {
		width: '100%',
		height: '100%',
		padding: 0,
		marginBottom: '2.8rem',
		overflow: 'auto',
	},
	content: {
		padding: 0,
	},
	list: {},
	endMessageBlock: {
		width: '100%',
		height: 1,
	},
});

interface MessagesViewProps {
	user: User;
	chatId: string;
}

export const MessagesView: FC<MessagesViewProps> = ({
	user,
	chatId,
}): ReactElement => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const messages = useSelector(selectMessages);
	const loading = useSelector(selectChatsLoading);
	const chat = useSelector(selectChat);
	const messagesEndRef = useRef<HTMLSpanElement>(null);

	const [inputValue, setInputValue] = useState<string>('');
	const [showIcons, setShowIcons] = useState<boolean>(false);
	const [file, setFile] = useState<any>(null);
	const [visibleEmoji, setVisibleEmoji] = useState<boolean>(false);
	const [visibleModal, setVisibleModal] = useState<boolean>(false);
	const [message, setMessage] = useState<Message | null>(null);

	useEffect(() => {
		if (file) {
			dispatch(sendImageMessage(file, chatId, user));
			setFile(null);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [file]);

	useEffect(() => {
		const unsubscribe = firestore
			.collection(CHATS)
			.doc(chatId)
			.collection(MESSAGES)
			.onSnapshot(() => {
				dispatch(fetchMessages(chatId));
			});

		return () => unsubscribe();
	}, [chatId, dispatch]);

	useEffect(() => {
		if (messages.length && !loading) {
			scrollToBottom();
		}

		if (visibleEmoji) {
			scrollToBottom();
		}
	}, [loading, messages.length, visibleEmoji]);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	const handleMessageInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
		setInputValue(e.target.value);

		if (e.target.value) {
			setShowIcons(true);
		} else {
			setShowIcons(false);
		}
	};

	const handleSendMessage = async () => {
		if (inputValue) {
			dispatch(sendMessage(chatId, inputValue, user));
		}

		const interlocutor =
			chat.users.firstUser._id === user._id
				? chat.users.secondUser
				: chat.users.firstUser;

		const token = await fetchToken(interlocutor._id);

		if (token) {
			const payload = {
				token: token,
				title: 'Новое сообщение',
				body: inputValue,
				url: window.location.href,
			};
			await sendNotification(payload);
		}

		setInputValue('');
		setShowIcons(false);
		setVisibleEmoji(false);
	};

	const handleFileInputChange = async (
		e: React.ChangeEvent<HTMLInputElement> | any
	) => {
		const file = e.target.files?.item(0);
		const reader = new FileReader();

		reader.onload = (e) => {
			const result = e.target?.result;
			setFile(result);
		};

		reader.readAsDataURL(file);
	};

	const handleMessageClick = (e: any, m: Message): void => {
		setMessage(m);
		visibleModal ? setVisibleModal(false) : setVisibleModal(true);
	};

	const handleEmojiClick = (_: any, emojiObject: any) => {
		setInputValue((text) => `${text}${emojiObject.emoji}`);
	};

	const handleDeleteMessage = () => {
		dispatch(deleteMessage(chatId, message?._id));
		setVisibleModal(false);
	};

	if (loading) {
		return <Loader />;
	}

	return (
		<Card classes={{ root: classes.view }}>
			{message && (
				<MessageModal
					open={visibleModal}
					onClose={handleMessageClick}
					message={message}
					onDeleteClick={handleDeleteMessage}
				/>
			)}
			<CardContent className={classes.content}>
				<List disablePadding dense className={classes.list}>
					{messages.map((message) => {
						if (message.user._id === user._id) {
							return (
								<MessageRight
									onMessageClick={handleMessageClick}
									message={message}
									key={message._id}
								/>
							);
						}

						return (
							<MessageLeft
								onMessageClick={handleMessageClick}
								message={message}
								key={message._id}
							/>
						);
					})}
				</List>
			</CardContent>
			<span ref={messagesEndRef} className={classes.endMessageBlock}></span>
			<SendMessageForm
				inputValue={inputValue}
				onChangeMessageInput={handleMessageInputChange}
				showIcons={showIcons}
				onClickSend={handleSendMessage}
				onChangeFileInput={handleFileInputChange}
				onEmojiClick={handleEmojiClick}
				visibleEmoji={visibleEmoji}
				setVisibleEmoji={setVisibleEmoji}
			/>
		</Card>
	);
};
