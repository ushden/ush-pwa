import { RootState } from './rootReducer';

export const selectUser = (state: RootState) => state.user.user;
export const selectChats = (state: RootState) => state.chats.chats;
export const selectAnotherUser = (state: RootState) => state.users.anotherUser;
export const selectUsersLoading = (state: RootState) =>
	state.users.usersLoading;
export const selectChat = (state: RootState) => state.chats.chat;
export const selectChatsLoading = (state: RootState) =>
	state.chats.chatsLoading;
export const selectMessages = (state: RootState) => state.chats.messages;
