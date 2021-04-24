import { useEffect, useState } from 'react';
import { CHATS, MESSAGES } from '../constants/constants';
import { DocData, firestore } from '../firebase';
import { Message } from '../store/types';

export const useLastMessage = (chatId: string): string => {
	const [message, setMessage] = useState<null | Message | DocData | undefined>(
		null
	);

	useEffect(() => {
		const unsubscribe = firestore
			.collection(CHATS)
			.doc(chatId)
			.collection(MESSAGES)
			.orderBy('createdAt', 'desc')
			.limit(1)
			.onSnapshot((doc) => {
				if (doc.size === 0) {
					setMessage(undefined);
					return;
				}

				doc.forEach((m) => {
					if (m.exists) {
						setMessage(m.data());
					}
				});
			});

		return () => unsubscribe();
	}, [chatId]);

	return message?.image ? 'Изображение' : message?.text;
};
