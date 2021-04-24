import {
	Dialog,
	DialogContent,
	DialogTitle,
	Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { FC } from 'react';
import { COLOR_PRIMARY } from '../../constants/constants';

const useStyles = makeStyles({
	installBtn: {
		backgroundColor: COLOR_PRIMARY,
		color: '#fff',
	},
	btnContainer: {
		justifyContent: 'center',
	},
	title: {
		paddingBottom: 0,
	},
	helloText: {
		color: COLOR_PRIMARY,
		fontWeight: 'bolder',
		fontSize: '1.2rem',
	},
});

interface ModalProps {
	visibleModal: boolean;
}

export const PermissionModal: FC<ModalProps> = ({ visibleModal }) => {
	const classes = useStyles();

	return (
		<Dialog open={visibleModal}>
			<DialogTitle className={classes.title}>
				<img
					src='/images/icons/icon-512x512.png'
					alt='Social Ush PWA'
					style={{ maxWidth: '100%', objectFit: 'contain' }}
				/>
			</DialogTitle>
			<DialogContent>
				<Typography component='h2' align='center' className={classes.helloText}>
					Еще раз здраствуйте!
				</Typography>
				<Typography component='p' align='center'>
					Пожалуйста, дай разрешение на показ уведомлений, нужно только для чата
					и все
				</Typography>
			</DialogContent>
		</Dialog>
	);
};
