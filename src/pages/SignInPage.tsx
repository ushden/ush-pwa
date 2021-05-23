import { useState } from 'react';
import { Box, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { COLOR_EXTRA_LIGHT } from '../constants/constants';
import { SignInForm } from '../components/signInPage/SignInForm';
import { signInUserWithEmailAndPassword } from '../store/user/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../components/Loader';
import { selectUserLoading } from '../store/selectors';

const useStyles = makeStyles({
	section: {
		backgroundColor: COLOR_EXTRA_LIGHT,
		width: '100vw',
		height: '100vh',
		overflow: 'hidden',
	},
	container: {
		display: 'flex',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	loaderWrap: {
		width: '100vw',
		height: '100vh',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export const SignInPage = (): React.ReactElement => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const [email, setEmail] = useState<string>('');
	const [pass, setPass] = useState<string>('');

	const loading = useSelector(selectUserLoading);

	const handleClickSignInUser = () => {
		dispatch(signInUserWithEmailAndPassword(email, pass));
	};

	return (
		<Box component='section' className={classes.section}>
			<Container className={classes.container}>
				{loading ? (
					<Box className={classes.loaderWrap}>
						<Loader />
					</Box>
				) : (
					<SignInForm
						email={email}
						pass={pass}
						setPass={setPass}
						setEmail={setEmail}
						handleClickSignInUser={handleClickSignInUser}
					/>
				)}
			</Container>
		</Box>
	);
};
