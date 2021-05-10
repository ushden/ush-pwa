import { Color } from '@material-ui/lab';
import { HIDE_ALERT, SHOW_ALERT } from '../constants/constants';

// alert
export interface AlertState {
	visible: boolean;
	type: Color;
	message: string;
}

interface showAlert {
	type: typeof SHOW_ALERT;
	payload: AlertState;
}

interface hideAlert {
	type: typeof HIDE_ALERT;
	payload: boolean;
}

export type AlertActions = showAlert | hideAlert;

// user
export enum UserActions {
	GET_USER = 'GET_USER',
	SIGN_OUT = 'SIGN_OUT',
	SHOW_USER_LOADER = 'SHOW_LOADER',
	HIDE_USER_LOADER = 'HIDE_LOADER',
}

interface chatWhithUsers {
	userId: string;
	chatId: string;
}
export interface User {
	_id: string;
	name: string;
	email: string | undefined;
	photoUrl?: string | undefined;
	gender?: string;
	phone?: string;
	rating?: number;
	isLogIn?: {
		status: string;
		lastChanged: string;
	};
	subscribs?: number;
	followers?: number;
	subscribeOn?: Array<string>;
	followMe?: Array<string>;
	pushToken?: string;
	savedPosts?: Array<string>;
	chatWithUsers?: Array<chatWhithUsers>;
}
export interface UserState {
	user: User;
	userLoading: boolean;
}
interface getUser {
	type: UserActions.GET_USER;
	payload: User;
}
interface signOutUser {
	type: UserActions.SIGN_OUT;
}
interface showUserLoader {
	type: UserActions.SHOW_USER_LOADER;
}
interface hideUserLoader {
	type: UserActions.HIDE_USER_LOADER;
}

export type UserActionsType =
	| getUser
	| signOutUser
	| showUserLoader
	| hideUserLoader;

// users
export enum UsersActions {
	FETCH_USERS = 'FETCH_USERS',
	FETCH_ANOTHER_USER = 'FETCH_ANOTHER_USER',
	SHOW_USERS_LOADING = 'SHOW_USERS_LOADING',
	HIDE_USERS_LOADING = 'HIDE_USERS_LOADING',
	RESET_ANOTHER_USER = 'RESET_ANOTHER_USER',
}

export interface UsersState {
	anotherUser: User;
	users: Array<User>;
	usersLoading: boolean;
}

interface fetchAnotherUser {
	type: UsersActions.FETCH_ANOTHER_USER;
	payload: User;
}
interface resetAnotherUser {
	type: UsersActions.RESET_ANOTHER_USER;
}
interface fetchUsersAction {
	type: UsersActions.FETCH_USERS;
	payload: Array<User>;
}

interface showUsersLoadingAction {
	type: UsersActions.SHOW_USERS_LOADING;
}

interface hideUsersLoadingAction {
	type: UsersActions.HIDE_USERS_LOADING;
}

export type UsersActionsType =
	| fetchUsersAction
	| showUsersLoadingAction
	| hideUsersLoadingAction
	| fetchAnotherUser
	| resetAnotherUser;
// post
export interface PostsState {
	post: PostType;
	posts: Array<PostType>;
	postLoading: boolean;
}

export interface PostType {
	_id: string;
	title: string;
	description?: string;
	image: string;
	createAt: string;
	rating?: number;
	comments?: number;
	user: User;
}

export enum PostsActions {
	CREATE_POST = 'CREATE_POST',
	DELETE_POST = 'DELETE_POST',
	FETCH_POSTS = 'FETCH_POSTS',
	FETCH_POST = 'FETCH_POST',
	SHOW_POST_LOADER = 'SHOW_POST_LOADER',
	HIDE_POST_LOADER = 'HIDE_POST_LOADER',
}

interface createPost {
	type: PostsActions.CREATE_POST;
	payload: PostType;
}
interface deletePost {
	type: PostsActions.DELETE_POST;
	payload: string;
}
interface fetchPosts {
	type: PostsActions.FETCH_POSTS;
	payload: Array<PostType>;
}

interface fetchPost {
	type: PostsActions.FETCH_POST;
	payload: PostType;
}

interface showPostLoader {
	type: PostsActions.SHOW_POST_LOADER;
}

interface hidePostLoader {
	type: PostsActions.HIDE_POST_LOADER;
}

export type PostsActionsType =
	| fetchPosts
	| fetchPost
	| showPostLoader
	| hidePostLoader
	| createPost
	| deletePost;

// Comments
export interface CommentType {
	_id: string;
	text: string;
	createAt: string;
	postId: string;
	user: User;
}
export interface CommentsState {
	comment: CommentType;
	comments: Array<CommentType>;
	commentsLoading: boolean;
}

export enum CommentsActions {
	ADD_COMMENT = 'ADD_COMMENT',
	FETCH_COMMENTS = 'FETCH_COMMENTS',
	SHOW_COMMENT_LOADING = 'SHOW_COMMENT_LOADING',
	HIDE_COMMENT_LOADING = 'HIDE_COMMENT_LOADING',
	DELETE_COMMENT = 'DELETE_COMMENT',
}

interface addCommentActionType {
	type: CommentsActions.ADD_COMMENT;
	payload: CommentType;
}

interface deleteCommentActionType {
	type: CommentsActions.DELETE_COMMENT;
	payload: string;
}

interface fetchCommentsActionType {
	type: CommentsActions.FETCH_COMMENTS;
	payload: Array<CommentType>;
}
interface showCommentLoadingActionType {
	type: CommentsActions.SHOW_COMMENT_LOADING;
}

interface hideCommentsLoadingActionType {
	type: CommentsActions.HIDE_COMMENT_LOADING;
}

export type CommentsActionsType =
	| addCommentActionType
	| showCommentLoadingActionType
	| hideCommentsLoadingActionType
	| fetchCommentsActionType
	| deleteCommentActionType;

// Chats
export enum ChatsActions {
	FETCH_CHATS = 'FETCH_CHATS',
	FETCH_CHAT = 'FETCH_CHAT',
	FETCH_MESSAGES = 'FETCH_MESSAGES',
	CREATE_CHAT = 'CREATE_CHAT',
	SHOW_CHAT_LOADING = 'SHOW_CHAT_LOADING',
	HIDE_CHAT_LOADING = 'HIDE_CHAT_LOADING',
	SET_UNREAD_MESSAGE_FIRST_USER = 'SET_UNREAD_MESSAGE_FIRST_USER',
	SET_UNREAD_MESSAGE_SECOND_USER = 'SET_UNREAD_MESSAGE_SECOND_USER',
	RESET_NEW_MESSAGE_STATE = 'RESET_NEW_MESSAGE_STATE',
}

interface setUnreadMessageSecondUser {
	type: ChatsActions.SET_UNREAD_MESSAGE_SECOND_USER;
}
interface resetNewMessageState {
	type: ChatsActions.RESET_NEW_MESSAGE_STATE;
}
interface setUnreadMessageFirstUser {
	type: ChatsActions.SET_UNREAD_MESSAGE_FIRST_USER;
}
interface fetchMesagesAction {
	type: ChatsActions.FETCH_MESSAGES;
	payload: Array<Message>;
}
interface createChatAction {
	type: ChatsActions.CREATE_CHAT;
	payload: Chat;
}
interface fetchChatsAction {
	type: ChatsActions.FETCH_CHATS;
	payload: Array<Chat>;
}

interface fetchChatAction {
	type: ChatsActions.FETCH_CHAT;
	payload: Chat;
}

interface showChatLoadingAction {
	type: ChatsActions.SHOW_CHAT_LOADING;
}

interface hideChatLoadingAction {
	type: ChatsActions.HIDE_CHAT_LOADING;
}

export type ChatsActionsType =
	| fetchChatAction
	| fetchChatsAction
	| showChatLoadingAction
	| hideChatLoadingAction
	| createChatAction
	| fetchMesagesAction
	| setUnreadMessageSecondUser
	| setUnreadMessageFirstUser
	| resetNewMessageState;

export interface Message {
	_id: string;
	text?: string;
	image?: string;
	createdAt: string;
	chatId: string;
	user: User;
}
export interface Chat {
	_id: string;
	createAt: string;
	isFirstUserHaveNewMessages?: boolean;
	isSecondUserHaveNewMessages?: boolean;
	users: {
		firstUser: User;
		secondUser: User;
	};
}

export interface ChatsState {
	chat: Chat;
	chats: Array<Chat>;
	messages: Array<Message>;
	chatsLoading: boolean;
	imageLoading: boolean;
}
