import {
	Button,
	makeStyles,
	TextField,
	Typography,
	withStyles,
} from '@material-ui/core';
import { FC } from 'react';
import { COLOR_PRIMARY } from '../../constants/constants';

const CustomInput = withStyles({
	root: {
		'& label.Mui-focused': {
			color: COLOR_PRIMARY,
		},
		'& .MuiInput-underline:after': {
			borderBottomColor: COLOR_PRIMARY,
		},
		'& .MuiOutlinedInput-root': {
			'& fieldset': {
				borderColor: COLOR_PRIMARY,
			},
			'&:hover fieldset': {
				borderColor: COLOR_PRIMARY,
			},
			'&.Mui-focused fieldset': {
				borderColor: COLOR_PRIMARY,
			},
		},
	},
})(TextField);

const useStyles = makeStyles({
	input: {
		width: '100%',
		maxWidth: '100%',
		marginBottom: '1rem',
	},
	title: {
		marginBottom: '1rem',
		fontWeight: 'bolder',
	},
	saveBtn: {
		marginBottom: '1rem',
		color: '#fff',
		backgroundColor: COLOR_PRIMARY,
		'&:focus': {
			backgroundColor: COLOR_PRIMARY,
		},
	},
});

interface ChangePasswordAreaProps {
	pass: string;
	setPass: React.Dispatch<React.SetStateAction<string>>;
	setConfirmPass: React.Dispatch<React.SetStateAction<string>>;
	confirmPass: string;
	ocClickChangePass: () => void;
}

export const ChangePasswordArea: FC<ChangePasswordAreaProps> = ({
	pass,
	setPass,
	setConfirmPass,
	confirmPass,
	ocClickChangePass,
}) => {
	const classes = useStyles();

	return (
		<form>
			<Typography component='h4' className={classes.title}>
				Вы можете сменить Ваш пароль
			</Typography>
			<CustomInput
				variant='outlined'
				label='Новый пароль'
				type='password'
				value={pass}
				placeholder='Минимум 6 символов'
				autoComplete='new-password username'
				className={classes.input}
				onChange={(e) => setPass(e.target.value)}
			/>
			<CustomInput
				variant='outlined'
				label='Подтвердите пароль'
				type='password'
				value={confirmPass}
				autoComplete='new-password username'
				className={classes.input}
				onChange={(e) => setConfirmPass(e.target.value)}
			/>
			<Button className={classes.saveBtn} onClick={ocClickChangePass}>
				Сменить пароль
			</Button>
		</form>
	);
};
