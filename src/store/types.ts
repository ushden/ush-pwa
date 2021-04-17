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
export interface User {
	_id: string;
	name: string;
	email: string | undefined;
	photoUrl?: string | undefined;
	isLogIn?: boolean;
	savedPosts?: Array<string>;
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
	| fetchAnotherUser;

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
