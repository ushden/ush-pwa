import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChats } from '../store/chats/chatActions';
import { selectChats, selectUser } from '../store/selectors';
import { getUser } from '../store/user/userActions';

export const useNewMessageStateGlobal = () => {
	const dispatch = useDispatch();

	const user = useSelector(selectUser);
	const chats = useSelector(selectChats).filter(
		(chat) =>
			chat.users.firstUser._id === user._id ||
			chat.users.secondUser._id === user._id
	);

	useEffect(() => {
		if (!user._id) {
			dispatch(getUser());
		}

		if (chats.length === 0) {
			dispatch(fetchChats());
		}
	}, [chats.length, dispatch, user._id]);

	const isUserHaveNewMessage = useMemo(() => {
		for (let i = 0; i < chats.length; i++) {
			const firstUserId = chats[i].users.firstUser._id;
			const secondUserId = chats[i].users.secondUser._id;

			if (firstUserId === user._id) {
				if (chats[i].isFirstUserHaveNewMessages) {
					return chats[i].isFirstUserHaveNewMessages;
				}
			}

			if (secondUserId === user._id) {
				if (chats[i].isSecondUserHaveNewMessages) {
					return chats[i].isSecondUserHaveNewMessages;
				}
			}
		}

		return false;
	}, [chats, user._id]);

	return isUserHaveNewMessage;
};
