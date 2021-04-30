import { RootState } from './rootReducer';

export const selectUser = (state: RootState) => state.user.user;
export const selectUsers = (state: RootState) => state.users.users;
export const selectAnotherUser = (state: RootState) => state.users.anotherUser;
export const selectUsersLoading = (state: RootState) =>
	state.users.usersLoading;
export const selectSubscribeOn = (state: RootState) =>
	state.user.user.subscribeOn;

export const selectChats = (state: RootState) => state.chats.chats;
export const selectChat = (state: RootState) => state.chats.chat;
export const selectChatsLoading = (state: RootState) =>
	state.chats.chatsLoading;

export const selectMessages = (state: RootState) => state.chats.messages;
export const selectImageLoading = (state: RootState) =>
	state.chats.imageLoading;

export const selectPostsLoading = (state: RootState) => state.posts.postLoading;
export const selectPosts = (state: RootState) => state.posts.posts;
export const selectPost = (state: RootState) => state.posts.post;
export const selectCommentsLoading = (state: RootState) =>
	state.comments.commentsLoading;
