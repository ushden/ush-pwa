import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ALERT_SUCCESS, COLOR_PRIMARY } from '../constants/constants';
import { showAlert } from '../store/alert/alertActions';

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

export const InstalModal = () => {
	const classes = useStyles();
	const promptEvent = useRef<any>();
	const dispatch = useDispatch();

	const [visibleModal, setVisibleModal] = useState<boolean>(false);

	useEffect(() => {
		window.addEventListener('beforeinstallprompt', beforeInstall);

		return () => {
			window.removeEventListener('beforeinstallprompt', beforeInstall);
		};
	}, []);

	useEffect(() => {
		window.addEventListener('appinstalled', appInstalled);

		return () => {
			window.removeEventListener('appinstalled', appInstalled);
		};
	}, []);

	const beforeInstall = (e: any) => {
		e.preventDefault();

		promptEvent.current = e;

		setVisibleModal(true);
	};

	const appInstalled = () => {
		promptEvent.current = null;

		setVisibleModal(false);
	};

	const handleInstallClick = async () => {
		if (!promptEvent.current) {
			setVisibleModal(false);
			return;
		}
		promptEvent?.current?.prompt();

		const userChoice = await promptEvent.current.userChoice;

		if (userChoice.outcome === 'accepted') {
			setVisibleModal(false);
			dispatch(showAlert(ALERT_SUCCESS, 'Спасибо за установку :)'));
		}
	};

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
					Приветствую Вас!
				</Typography>
				<Typography component='span'>
					Пожалуйста установите это приложение, это необходимо для дальнейшей
					работы. Спасибо :)
				</Typography>
			</DialogContent>
			<DialogActions className={classes.btnContainer}>
				<Button
					onClick={handleInstallClick}
					variant='contained'
					className={classes.installBtn}>
					Установить
				</Button>
			</DialogActions>
		</Dialog>
	);
};
