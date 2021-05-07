import {
	TextField,
	withStyles,
	makeStyles,
	Typography,
	Divider,
	InputAdornment,
} from '@material-ui/core';
import { FC } from 'react';
import { COLOR_PRIMARY } from '../../constants/constants';

const useStyles = makeStyles({
	title: {
		marginBottom: '1rem',
		fontWeight: 'lighter',
		textAlign: 'center',
		color: '#ccc',
	},
	input: {
		width: '100%',
		maxWidth: '100%',
		marginBottom: '1rem',
	},
	inputHide: {
		display: 'none',
	},
	divider: {
		marginBottom: '1rem',
	},
	avatarWrap: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: '2rem',
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

interface GeneralUserInfoProps {
	name: string;
	setName: React.Dispatch<React.SetStateAction<string>>;
	email: string | undefined;
	setEmail: React.Dispatch<React.SetStateAction<string | undefined>>;
	phone: number | string;
	setPhone: React.Dispatch<React.SetStateAction<string | number>>;
}

export const GeneralUserInfo: FC<GeneralUserInfoProps> = (props) => {
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
				disabled
				onChange={(e) => props.setEmail(e.target.value)}
			/>
			<CustomInput
				variant='outlined'
				label='Ваш телефон'
				value={props.phone}
				placeholder='(---) --- -- --'
				type='number'
				className={classes.input}
				InputProps={{
					startAdornment: <InputAdornment position='start'>+38</InputAdornment>,
				}}
				onChange={(e) => props.setPhone(+e.target.value)}
			/>
			<Divider component='p' className={classes.divider} />
		</>
	);
};
