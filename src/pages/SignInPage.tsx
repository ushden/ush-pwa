import { useState } from 'react';
import { Box, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { COLOR_EXTRA_LIGHT } from '../constants/constants';
import { SignInForm } from '../components/signInPage/SignInForm';

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

	const [email, setEmail] = useState<string>('');
	const [pass, setPass] = useState<string>('');

	return (
		<Box component='section' className={classes.section}>
			<Container className={classes.container}>
				<SignInForm
					email={email}
					pass={pass}
					setPass={setPass}
					setEmail={setEmail}
				/>
			</Container>
		</Box>
	);
};
