import { ChatsActions, ChatsActionsType, ChatsState } from '../types';

const initialState: ChatsState = {
	chat: {
		_id: '',
		createAt: '',
		isFirstUserHaveNewMessages: false,
		isSecondUserHaveNewMessages: false,
		firstUserNewMessagesCount: 0,
		secondUserNewMessagesCount: 0,
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
	chatsLoading: false,
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
			return { ...state, chat: { ...action.payload } };
		case ChatsActions.FETCH_MESSAGES:
			return { ...state, messages: [...action.payload] };
		case ChatsActions.CREATE_CHAT:
			return { ...state, chat: { ...action.payload } };
		case ChatsActions.SHOW_CHAT_LOADING:
			return { ...state, chatsLoading: true };
		case ChatsActions.HIDE_CHAT_LOADING:
			return { ...state, chatsLoading: false };
		case ChatsActions.HIDE_IMAGE_LOADING:
			return { ...state, imageLoading: false };
		case ChatsActions.SHOW_IMAGE_LOADING:
			return { ...state, imageLoading: true };
		default:
			return { ...state };
	}
};
