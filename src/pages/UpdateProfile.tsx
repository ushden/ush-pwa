import {
	Box,
	Container,
	TextField,
	withStyles,
	makeStyles,
} from '@material-ui/core';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavigationPanel } from '../components/navigation/NavigationPanel';
import { GeneralUserInfo } from '../components/updateProfile/GeneralUserInfo';
import { COLOR_PRIMARY } from '../constants/constants';
import { selectUser } from '../store/selectors';

const useStyles = makeStyles({
	container: {
		paddingTop: '1rem',
	},
	input: {
		width: '100%',
		maxWidth: '100%',
		marginBottom: '1rem',
	},
});

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

export const UpdateProfile = () => {
	const classes = useStyles();
	const user = useSelector(selectUser);

	const [name, setName] = useState<string>(user.name);
	const [email, setEmail] = useState<string | undefined>(user.email);
	const [phone, setPhone] = useState<number | string>('');
	const [pass, setPass] = useState<string>('');

	return (
		<Box component='section'>
			<NavigationPanel backButton title='Редактировать профиль' />
			<Container className={classes.container}>
				<GeneralUserInfo
					name={name}
					setName={setName}
					email={email}
					setEmail={setEmail}
					phone={phone}
					setPhone={setPhone}
				/>
				<CustomInput
					variant='outlined'
					label='Новый пароль'
					type='password'
					value={pass}
					placeholder='Минимум 6 символов'
					className={classes.input}
					onChange={(e) => setPass(e.target.value)}
				/>
			</Container>
		</Box>
	);
};
