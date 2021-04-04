import { Color } from '@material-ui/lab';
import {
	GET_USER,
	HIDE_ALERT,
	SHOW_ALERT,
	SIGN_OUT,
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
	photoUrl: string | undefined;
	isLogIn?: boolean;
}
interface getUser {
	type: typeof GET_USER;
	payload: DocData;
}

interface signOutUser {
	type: typeof SIGN_OUT;
}

export type UserActions = getUser | signOutUser;
