import { ChatsActions, ChatsActionsType, ChatsState } from '../types';

const initialState: ChatsState = {
	chat: {
		_id: '',
		createAt: '',
		isFirstUserHaveNewMessages: false,
		isSecondUserHaveNewMessages: false,
		users: {
			firstUser: {
				_id: '',
				name: '',
				email: '',
				photoUrl: '',
			},
			secondUser: {
				_id: '',
				name: '',
				email: '',
				photoUrl: '',
			},
		},
	},
	chats: [],
	messages: [],
	chatsLoading: true,
	imageLoading: false,
};

export const chatsReducer = (
	state = initialState,
	action: ChatsActionsType
): ChatsState => {
	switch (action.type) {
		case ChatsActions.FETCH_CHATS:
			return { ...state, chats: [...action.payload] };
		case ChatsActions.FETCH_CHAT:
			return { ...state, chat: { ...state.chat, ...action.payload } };
		case ChatsActions.FETCH_MESSAGES:
			return { ...state, messages: [...action.payload] };
		case ChatsActions.SET_UNREAD_MESSAGE_FIRST_USER:
			return {
				...state,
				chat: { ...state.chat, isFirstUserHaveNewMessages: true },
			};
		case ChatsActions.SET_UNREAD_MESSAGE_SECOND_USER:
			return {
				...state,
				chat: { ...state.chat, isSecondUserHaveNewMessages: true },
			};
		case ChatsActions.RESET_NEW_MESSAGE_STATE:
			return {
				...state,
				chat: {
					...state.chat,
					isSecondUserHaveNewMessages: false,
					isFirstUserHaveNewMessages: false,
				},
			};
		case ChatsActions.CREATE_CHAT:
			return { ...state, chat: { ...action.payload } };
		case ChatsActions.SHOW_CHAT_LOADING:
			return { ...state, chatsLoading: true };
		case ChatsActions.HIDE_CHAT_LOADING:
			return { ...state, chatsLoading: false };
		default:
			return { ...state };
	}
};
