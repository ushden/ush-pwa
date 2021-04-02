import { Color } from '@material-ui/lab';
import {
	GET_USER,
	HIDE_ALERT,
	SHOW_ALERT,
	USER_SIGN_UP,
} from '../constants/constants';
import { DocData } from '../firebase';

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
export interface UserState {
	_id: string;
	name: string | null;
	email: string | null;
	photoUrl: string | null;
	isLogIn?: boolean;
}

interface signUpUser {
	type: typeof USER_SIGN_UP;
	payload: UserState;
}

interface getUser {
	type: typeof GET_USER;
	payload: DocData;
}

export type UserActions = signUpUser | getUser;
