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
	name: string | null;
	email: string | null;
	photoUrl: string | undefined;
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
