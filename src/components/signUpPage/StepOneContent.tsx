import { Box, Divider, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
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

import { COLOR_DARK } from '../../constants/constants';
import { useState } from 'react';

const useStyles = makeStyles({
	box: {
		textAlign: 'center',
	},
	text: {
		marginBottom: '0.5rem',
		fontWeight: 'bold',
	},
	form: {
		marginTop: '1rem',
		width: '100%',
	},
	icon: {
		color: COLOR_DARK,
	},
	content: {
		borderRadius: '1rem',
		backgroundColor: '#fff',
		padding: '1rem',
		paddingBottom: '3rem',
		paddingTop: '3rem',
	},
	showPassIcon: {
		color: COLOR_DARK,
	},
});

interface PropsType {
	email: string;
	pass: string;
	setEmail: React.Dispatch<React.SetStateAction<string>>;
	setPass: React.Dispatch<React.SetStateAction<string>>;
}

export const StepOneContent: React.FC<PropsType> = ({
	email,
	pass,
	setEmail,
	setPass,
}: PropsType): React.ReactElement => {
	const classes = useStyles();
	const [showPass, setShowPass] = useState<boolean>(false);

	const handleClickShowPassword = () => {
		setShowPass((pass) => !pass);
	};

	return (
		<Box
			component='div'
			className={classesName(classes.content, 'anim-transform')}>
			<Box component='div' className={classes.box}>
				<Typography component='h3' className={classes.text}>
					Придумайте email и пароль
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
							placeholder='*******'
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
		</Box>
	);
};
