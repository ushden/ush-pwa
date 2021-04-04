import {
	Box,
	makeStyles,
	Paper,
	Typography,
	Divider,
	Button,
} from '@material-ui/core';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import classesName from 'classnames';

import { COLOR_DARK, COLOR_PRIMARY } from '../../constants/constants';
import { useHistory } from 'react-router';
import { useState } from 'react';

const useStyles = makeStyles({
	content: {
		borderRadius: '1rem',
		backgroundColor: '#fff',
		padding: '1rem',
		paddingBottom: '3rem',
		paddingTop: '3rem',
	},
	form: {
		marginTop: '1rem',
		width: '100%',
	},
	icon: {
		color: COLOR_DARK,
	},
	title: {
		textAlign: 'center',
		fontWeight: 'bolder',
	},
	inputWrapper: {
		marginBottom: '1rem',
	},
	btnWrapper: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-evenly',
	},
	btnBack: {
		backgroundColor: 'transparent',
		color: COLOR_PRIMARY,
	},
	btnIn: {
		backgroundColor: COLOR_DARK,
		color: '#fff',
	},
	showPassIcon: {
		color: COLOR_DARK,
	},
});

interface PropsType {
	pass: string;
	email: string;
	setPass: React.Dispatch<React.SetStateAction<string>>;
	setEmail: React.Dispatch<React.SetStateAction<string>>;
	handleClickSignInUser: () => void;
}

export const SignInForm: React.FC<PropsType> = ({
	pass,
	email,
	setPass,
	setEmail,
	handleClickSignInUser,
}: PropsType): React.ReactElement => {
	const classes = useStyles();
	const history = useHistory();
	const [showPass, setShowPass] = useState<boolean>(false);

	const handleClickShowPassword = () => {
		setShowPass((pass) => !pass);
	};

	return (
		<Paper
			component='div'
			className={classesName(classes.content, 'anim-transform')}>
			<Box component='div' className={classes.inputWrapper}>
				<Typography component='h3' className={classes.title}>
					Введите свои даные для входа
				</Typography>
				<Divider />
				<form>
					<FormControl className={classes.form}>
						<InputLabel htmlFor='input-email'>Ваш Email</InputLabel>
						<Input
							id='input-email'
							placeholder='nazik@kek.com'
							required
							type='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							startAdornment={
								<InputAdornment position='start'>
									<EmailOutlinedIcon className={classes.icon} />
								</InputAdornment>
							}
						/>
					</FormControl>
					<FormControl className={classes.form}>
						<InputLabel htmlFor='input-pass'>Ваш пароль</InputLabel>
						<Input
							id='input-pass'
							placeholder='******'
							required
							type={showPass ? 'text' : 'password'}
							value={pass}
							onChange={(e) => setPass(e.target.value)}
							autoComplete='current-password username'
							endAdornment={
								<InputAdornment position='end'>
									<IconButton
										aria-label='toggle password visibility'
										onClick={handleClickShowPassword}>
										{showPass ? (
											<Visibility className={classes.showPassIcon} />
										) : (
											<VisibilityOff className={classes.showPassIcon} />
										)}
									</IconButton>
								</InputAdornment>
							}
							startAdornment={
								<InputAdornment position='start'>
									<LockOutlinedIcon className={classes.icon} />
								</InputAdornment>
							}
						/>
					</FormControl>
				</form>
			</Box>
			<Box component='div' className={classes.btnWrapper}>
				<Button
					classes={{ root: classes.btnBack }}
					variant='contained'
					onClick={() => history.goBack()}>
					Назад
				</Button>
				<Button
					variant='contained'
					classes={{ root: classes.btnIn }}
					onClick={handleClickSignInUser}>
					Войти
				</Button>
			</Box>
		</Paper>
	);
};
