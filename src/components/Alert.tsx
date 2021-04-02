import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { useDispatch, useSelector } from 'react-redux';

import { hideAlert } from '../store/alert/alertActions';
import { RootState } from '../store/rootReducer';

const AlertShow = (props: AlertProps) => (
	<MuiAlert elevation={6} variant='filled' {...props} />
);

export const Alert = () => {
	const dispatch = useDispatch();
	const { visible, type, message } = useSelector(
		(state: RootState) => state.alert
	);

	const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}

		dispatch(hideAlert());
	};

	return (
		<Snackbar
			open={visible}
			autoHideDuration={4000}
			onClose={() => dispatch(hideAlert())}
			anchorOrigin={{ horizontal: 'right', vertical: 'top' }}>
			<AlertShow onClose={handleClose} severity={type}>
				{message}
			</AlertShow>
		</Snackbar>
	);
};
