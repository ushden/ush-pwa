import { useState } from 'react';
import { Box, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { COLOR_EXTRA_LIGHT } from '../constants/constants';
import { SignInForm } from '../components/signInPage/SignInForm';
import { signInUserWithEmailAndPassword } from '../store/user/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { Loader } from '../components/Loader';

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
});

export const SignInPage = (): React.ReactElement => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const [email, setEmail] = useState<string>('');
	const [pass, setPass] = useState<string>('');

	const loading = useSelector((state: RootState) => state.user.userLoading);

	const handleClickSignInUser = () => {
		dispatch(signInUserWithEmailAndPassword(email, pass));
	};

	return (
		<Box component='section' className={classes.section}>
			<Container className={classes.container}>
				{loading ? (
					<Loader />
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
