import { HIDE_ALERT, SHOW_ALERT } from '../../constants/constants';

export const showAlert = (type: string, message: string) => {
	const payload = {
		visible: true,
		type,
		message,
	};
	return {
		type: SHOW_ALERT,
		payload,
	};
};

export const hideAlert = () => {
	return {
		type: HIDE_ALERT,
		payload: false,
	};
};
