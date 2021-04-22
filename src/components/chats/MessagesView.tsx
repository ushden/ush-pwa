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
import { CHATS, MESSAGES } from '../../constants/constants';
import { firestore } from '../../firebase';
import {
	fetchMessages,
	sendImageMessage,
	sendMessage,
} from '../../store/chats/chatActions';
import { selectChatsLoading, selectMessages } from '../../store/selectors';
import { User } from '../../store/types';
import { Loader } from '../Loader';
import { MessageLeft } from './MessageLeft';
import { MessageRight } from './MessageRight';

import { SendMessageForm } from './SendMessageForm';

const useStyles = makeStyles({
	view: {
		width: '100%',
		height: '100%',
		padding: 0,
		marginBottom: '2.3rem',
		overflow: 'auto',
	},
	content: {
		padding: 0,
	},
	list: {},
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
	const messagesEndRef = useRef<HTMLSpanElement>(null);

	const [inputValue, setInputValue] = useState<string>('');
	const [showIcons, setShowIcons] = useState<boolean>(false);
	const [file, setFile] = useState<any>(null);

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
	}, [loading, messages.length]);

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

	const handleSendMessage = () => {
		if (inputValue) {
			dispatch(sendMessage(chatId, inputValue, user));
		}

		setInputValue('');
		setShowIcons(false);
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

	if (loading) {
		return <Loader />;
	}

	return (
		<Card classes={{ root: classes.view }}>
			<CardContent className={classes.content}>
				<List disablePadding dense className={classes.list}>
					{messages.map((message) => {
						if (message.user._id === user._id) {
							return <MessageRight message={message} key={message._id} />;
						}

						return <MessageLeft message={message} key={message._id} />;
					})}
				</List>
				<span ref={messagesEndRef}></span>
			</CardContent>
			<SendMessageForm
				inputValue={inputValue}
				onChangeMessageInput={handleMessageInputChange}
				showIcons={showIcons}
				onClickSend={handleSendMessage}
				onChangeFileInput={handleFileInputChange}
			/>
		</Card>
	);
};
