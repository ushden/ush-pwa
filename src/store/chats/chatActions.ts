import {
	fetchToken,
	sendImageNotification,
	SendImageNotificationParams,
} from './../../api/notification';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { uploadImage } from '../../api/uploadImage';
import {
	ALERT_ERROR,
	ALERT_INFO,
	ALERT_SUCCESS,
	CHATS,
	MESSAGES,
	USERS,
} from '../../constants/constants';
import {
	auth,
	DocData,
	firestore,
	increment,
	updateArray,
} from '../../firebase';
import { showAlert } from '../alert/alertActions';
import { RootState } from '../rootReducer';
import { Chat, ChatsActions, Message, User } from './../types';

const showChatsLoadingAction = () => ({ type: ChatsActions.SHOW_CHAT_LOADING });
const hideChatsLoadingAction = () => ({ type: ChatsActions.HIDE_CHAT_LOADING });
const createChatAction = (payload: Chat) => ({
	type: ChatsActions.CREATE_CHAT,
	payload,
});
const fetchChatsAction = (payload: Array<DocData | Chat>) => ({
	type: ChatsActions.FETCH_CHATS,
	payload,
});
const fetchChatAction = (payload: DocData | Chat) => ({
	type: ChatsActions.FETCH_CHAT,
	payload,
});
const fetchMessagesAction = (payload: Array<DocData | Message>) => ({
	type: ChatsActions.FETCH_MESSAGES,
	payload,
});
const setUnreadMessageFirstUserAction = () => ({
	type: ChatsActions.SET_UNREAD_MESSAGE_FIRST_USER,
});
const setUnreadMessageSecondUserAction = () => ({
	type: ChatsActions.SET_UNREAD_MESSAGE_SECOND_USER,
});
const resetNewMessageAction = () => ({
	type: ChatsActions.RESET_NEW_MESSAGE_STATE,
});

export const createChat = (
	payload: Chat
): ThunkAction<void, RootState, unknown, AnyAction> => {
	return async (dispatch) => {
		try {
			dispatch(showChatsLoadingAction());

			await firestore.collection(CHATS).doc(payload._id).set(payload);
			await firestore
				.collection(USERS)
				.doc(payload.users.firstUser._id)
				.update({
					chatWithUsers: updateArray.arrayUnion({
						userId: payload.users.secondUser._id,
						chatId: payload._id,
					}),
				});
			await firestore
				.collection(USERS)
				.doc(payload.users.secondUser._id)
				.update({
					chatWithUsers: updateArray.arrayUnion({
						userId: payload.users.firstUser._id,
						chatId: payload._id,
					}),
				});

			dispatch(createChatAction(payload));
			setTimeout(() => dispatch(hideChatsLoadingAction()), 500);
		} catch (error) {
			console.error(error.code, error.message);
			dispatch(hideChatsLoadingAction());
			setTimeout(
				() =>
					dispatch(
						showAlert(ALERT_ERROR, 'Произошла ошибка при создании чата')
					),
				500
			);
		}
	};
};

export const fetchChats = (): ThunkAction<
	void,
	RootState,
	unknown,
	AnyAction
> => {
	return async (dispatch) => {
		try {
			dispatch(showChatsLoadingAction());

			const payload: Array<DocData | Chat> = [];
			const doc = await firestore.collection(CHATS).get();

			doc.forEach((data) => {
				const chat = data.data();

				payload.push(chat);
			});

			dispatch(fetchChatsAction(payload));
			setTimeout(() => dispatch(hideChatsLoadingAction()), 500);
		} catch (error) {
			console.error(error.code, error.message);
			dispatch(hideChatsLoadingAction());
			setTimeout(
				() =>
					dispatch(
						showAlert(ALERT_ERROR, 'Произошла ошибка при загрузке чатов :(')
					),
				500
			);
		}
	};
};

export const fetchChat = (
	id: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
	return async (dispatch) => {
		try {
			dispatch(showChatsLoadingAction());

			const doc = await firestore.collection(CHATS).doc(id).get();

			dispatch(fetchChatAction(doc.data()));
			setTimeout(() => dispatch(hideChatsLoadingAction()), 500);
		} catch (error) {
			console.error(error.code, error.message);
			dispatch(showAlert(ALERT_ERROR, 'Произошла ошибка при загрузке чата'));
			setTimeout(() => dispatch(hideChatsLoadingAction()), 500);
		}
	};
};

export const sendMessage = (
	chatId: string,
	text: string,
	user: User
): ThunkAction<void, RootState, unknown, AnyAction> => {
	return async (dispatch) => {
		try {
			const payload: Message = {
				_id: Date.now().toString(),
				createdAt: new Date().toLocaleString(),
				text,
				chatId,
				user: { ...user },
			};
			await firestore
				.collection(CHATS)
				.doc(chatId)
				.collection(MESSAGES)
				.doc(payload._id)
				.set(payload);
		} catch (error) {
			console.error(error.code, error.message);
			dispatch(showAlert(ALERT_ERROR, 'Не удалось отправить сообщение'));
		}
	};
};

export const fetchMessages = (
	chatId: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
	return async (dispatch) => {
		try {
			const payload: Array<DocData | Message> = [];
			const doc = await firestore
				.collection(CHATS)
				.doc(chatId)
				.collection(MESSAGES)
				.limit(50)
				.orderBy('_id', 'asc')
				.get();

			doc.forEach((data) => {
				const message = data.data();

				payload.push(message);
			});

			dispatch(fetchMessagesAction(payload));
		} catch (error) {
			console.error(error.code, error.message);
			dispatch(showAlert(ALERT_ERROR, 'Не удалось загрузить сообщения'));
		}
	};
};

export const sendImageMessage = (
	uri: string,
	chatId: string,
	user: User,
	notificationId: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
	return async (dispatch) => {
		try {
			dispatch(showAlert(ALERT_INFO, 'Загрузка изображения...'));

			const random = Date.now().toString();
			const image = await uploadImage(uri, random, `chat/${chatId}`);

			const payload: Message = {
				_id: Date.now().toString(),
				createdAt: new Date().toLocaleString(),
				image,
				chatId,
				user: { ...user },
			};

			await firestore
				.collection(CHATS)
				.doc(chatId)
				.collection(MESSAGES)
				.doc(payload._id)
				.set(payload);

			dispatch(showAlert(ALERT_SUCCESS, 'Успешно!'));

			const token = await fetchToken(notificationId);

			const notificationData: SendImageNotificationParams = {
				token,
				title: `${user.name} отправил(-ла) Вам изображение:`,
				body: payload.createdAt,
				url: window.location.href,
				image,
			};

			await sendImageNotification(notificationData);
		} catch (error) {
			console.error(error.code, error.message);
			dispatch(showAlert(ALERT_ERROR, 'Не удалось отправить изображение'));
		}
	};
};

export const deleteMessage = (
	chatId: string,
	messageId: string | undefined
): ThunkAction<void, RootState, unknown, AnyAction> => {
	return async (dispatch) => {
		try {
			await firestore
				.collection(CHATS)
				.doc(chatId)
				.collection(MESSAGES)
				.doc(messageId)
				.delete();
		} catch (error) {
			console.error(error.code, error.message);
			dispatch(showAlert(ALERT_ERROR, 'Не удалось удалить сообщение'));
		}
	};
};

export const setUnreadMessage = (
	firstUserId: string,
	secondUserId: string,
	chatId: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
	return async (dispatch) => {
		try {
			const currentUserId = auth?.currentUser?.uid;

			if (currentUserId) {
				if (currentUserId === firstUserId) {
					await firestore.collection(CHATS).doc(chatId).update({
						isSecondUserHaveNewMessages: true,
						secondUserNewMessagesCount: 1,
					});

					return dispatch(setUnreadMessageSecondUserAction());
				}

				if (currentUserId === secondUserId) {
					await firestore.collection(CHATS).doc(chatId).update({
						isFirstUserHaveNewMessages: true,
						firstUserNewMessagesCount: 1,
					});

					return dispatch(setUnreadMessageFirstUserAction());
				}
			}
		} catch (error) {
			console.error(error.code, error.message);
		}
	};
};

export const updateNewMessageCount = (
	firstUserId: string,
	secondUserId: string,
	chatId: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
	return async (dispatch) => {
		try {
			const currentUserId = auth?.currentUser?.uid;

			if (currentUserId) {
				if (currentUserId === firstUserId) {
					await firestore.collection(CHATS).doc(chatId).update({
						secondUserNewMessagesCount: increment,
					});
				}

				if (currentUserId === secondUserId) {
					await firestore.collection(CHATS).doc(chatId).update({
						firstUserNewMessagesCount: increment,
					});
				}
			}
		} catch (error) {
			console.error(error.code, error.message);
		}
	};
};

export const resetNewMessage = (
	chatId: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
	return async (dispatch) => {
		try {
			await firestore.collection(CHATS).doc(chatId).update({
				isFirstUserHaveNewMessages: false,
				firstUserNewMessagesCount: 0,
				isSecondUserHaveNewMessages: false,
				secondUserNewMessagesCount: 0,
			});

			dispatch(resetNewMessageAction());
		} catch (error) {
			console.error(error.code, error.message);
		}
	};
};
