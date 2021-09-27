import { Box, Button, Container, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import TouchAppOutlinedIcon from '@material-ui/icons/TouchAppOutlined';
import InsertEmoticonOutlinedIcon from '@material-ui/icons/InsertEmoticonOutlined';
import classesName from 'classnames';

import {
	COLOR_EXTRA_LIGHT,
	COLOR_LIGHT,
	COLOR_PRIMARY,
} from '../constants/constants';
import { useHistory } from 'react-router';
import { InstalModal } from '../components/InstalModal';

const useStyles = makeStyles({
	welcomePage: {
		backgroundColor: COLOR_EXTRA_LIGHT,
		width: '100vw',
		height: '100vh',
	},
	welcomeContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		height: '100%',
	},
	logo: {
		maxWidth: '7rem',
		objectFit: 'contain',
	},
	welcomeBlock: {
		backgroundColor: '#fff',
		width: '100%',
		textAlign: 'center',
		borderRadius: '1rem',
		padding: '0.5rem',
	},
	title: {
		fontSize: '1.2rem',
		fontWeight: 'bold',
	},
	buttons: {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
		marginTop: '1rem',
	},
	btnLog: {
		marginBottom: '0.5rem',
		backgroundColor: COLOR_PRIMARY,
		'&:focus': {
			backgroundColor: COLOR_LIGHT,
		},
	},
	btnReg: {
		marginBottom: '0.5rem',
		color: COLOR_PRIMARY,
		borderColor: COLOR_PRIMARY,
	},
});

export const WelcomePage = () => {
	const classes = useStyles();
	const history = useHistory();

	const handleClickSignUp = () => {
		history.push('/signup');
	};

	const handleClickSignIn = () => {
		history.push('/signin');
	};

	return (
		<>
			<InstalModal />
			<Paper
				elevation={3}
				variant='elevation'
				className={classesName(classes.welcomePage, 'anim-opacity')}>
				<Container className={classes.welcomeContainer}>
					<Box component='div' className={classes.welcomeBlock}>
						<img
							src='/images/icons/icon-512x512.png'
							alt='Club 48'
							className={classes.logo}
						/>
						<Typography component='h2' className={classes.title}>
							Welcome!
						</Typography>
						<Typography variant='body1'>
							A social network where you can chat with friends, create and rate
							posts, write comments and mark your favorites, receive
							notifications, subscribe to people that interest you.
						</Typography>
						<Box component='h3'>If you do not want to register</Box>
						<Box component='p'>Login: test@test.com</Box>
						<Box component='p'>Password: 123456</Box>
						<Box component='div' className={classes.buttons}>
							<Button
								variant='contained'
								className={classes.btnLog}
								onClick={handleClickSignIn}
								endIcon={<TouchAppOutlinedIcon />}>
								Sign In
							</Button>
							<Button
								variant='outlined'
								onClick={handleClickSignUp}
								className={classes.btnReg}
								endIcon={<InsertEmoticonOutlinedIcon />}>
								Sign Up
							</Button>
						</Box>
					</Box>
				</Container>
			</Paper>
		</>
	);
};
