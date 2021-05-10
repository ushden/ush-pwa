import { useEffect, useState } from 'react';
import { CHATS } from '../constants/constants';
import { auth, firestore } from '../firebase';

export const useNewMessageState = (
	firstUserId: string,
	secondUserId: string,
	chatId: string
) => {
	const [isHaveNewMessage, setIsHaveNewMessage] = useState<boolean | null>(
		null
	);
	const [newMessageCount, setNewMessageCount] = useState<number | null>(null);

	useEffect(() => {
		(async () => {
			try {
				const currentUserId = auth.currentUser?.uid;

				const response = await firestore.collection(CHATS).doc(chatId).get();
				const chat = response.data();

				if (firstUserId === currentUserId) {
					setIsHaveNewMessage(chat?.isFirstUserHaveNewMessages);
					setNewMessageCount(chat?.firstUserNewMessagesCount);
				}

				if (secondUserId === currentUserId) {
					setIsHaveNewMessage(chat?.isSecondUserHaveNewMessages);
					setNewMessageCount(chat?.secondUserNewMessagesCount);
				}
			} catch (error) {
				console.error(error.code, error.message);
			}
		})();
	}, [chatId, firstUserId, secondUserId]);

	return {
		isHaveNewMessage,
		newMessageCount,
	};
};
