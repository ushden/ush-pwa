import {
	TextField,
	withStyles,
	makeStyles,
	Typography,
	Divider,
	Button,
} from '@material-ui/core';
import { FC } from 'react';
import { COLOR_PRIMARY } from '../../constants/constants';

const useStyles = makeStyles({
	title: {
		marginBottom: '1rem',
	},
	input: {
		width: '100%',
		maxWidth: '100%',
		marginBottom: '1rem',
	},
	divider: {
		marginBottom: '1rem',
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

interface GeneralUserInfoPops {
	name: string;
	setName: React.Dispatch<React.SetStateAction<string>>;
	email: string | undefined;
	setEmail: React.Dispatch<React.SetStateAction<string | undefined>>;
	phone: number | string;
	setPhone: React.Dispatch<React.SetStateAction<string | number>>;
}

export const GeneralUserInfo: FC<GeneralUserInfoPops> = (props) => {
	const classes = useStyles();

	return (
		<>
			<Typography component='h4' className={classes.title}>
				Общая информация
			</Typography>
			<CustomInput
				variant='outlined'
				label='Ваше имя'
				value={props.name}
				className={classes.input}
				onChange={(e) => props.setName(e.target.value)}
			/>
			<CustomInput
				variant='outlined'
				label='Ваш емейл'
				value={props.email}
				className={classes.input}
				onChange={(e) => props.setEmail(e.target.value)}
			/>
			<CustomInput
				variant='outlined'
				label='Ваш телефон'
				value={props.phone}
				placeholder='+380 (--) --- -- --'
				type='tel'
				className={classes.input}
				onChange={(e) => props.setPhone(+e.target.value)}
			/>

			<Button variant='contained' className={classes.saveBtn}>
				Сохранить изменения
			</Button>
			<Divider component='p' className={classes.divider} />
		</>
	);
};
