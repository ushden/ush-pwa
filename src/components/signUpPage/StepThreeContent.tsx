import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { COLOR_PRIMARY, DEFAULT_USER_AVATAR } from '../../constants/constants';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import classesName from 'classnames';

const useStyles = makeStyles({
	title: {
		fontSize: '1rem',
		fontWeight: 'bolder',
	},
	container: {
		textAlign: 'center',
	},
	text: {
		color: 'gray',
		fontSize: '0.7rem',
		marginBottom: '2rem',
	},
	input: {
		display: 'none',
	},
	avatarWrap: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: '2rem',
	},
	avatar: {
		width: '8rem',
		height: '8rem',
	},
	btn: {
		backgroundColor: COLOR_PRIMARY,
		'&:focus': {
			backgroundColor: COLOR_PRIMARY,
		},
	},
});

export const StepThreeContent = ({
	avatar,
	setAvatar,
	handleClick,
}: {
	avatar: string;
	setAvatar: React.Dispatch<React.SetStateAction<string | any>>;
	handleClick: () => void;
}) => {
	const classes = useStyles();

	const handleChange = async (e: React.ChangeEvent<HTMLInputElement> | any) => {
		const file = e.target.files?.item(0);
		const reader = new FileReader();

		reader.onload = (e) => {
			const result = e.target?.result;
			setAvatar(result);
		};

		reader.readAsDataURL(file);
	};

	return (
		<Box
			component='div'
			className={classesName(classes.container, 'anim-opacity')}>
			<Typography component='h3' className={classes.title}>
				Отлично! Как на счет аватарки?
			</Typography>
			<Typography component='p' className={classes.text}>
				Это не обезательно, Вы сможете настроить свой профиль позже
			</Typography>
			<Box component='div' className={classes.avatarWrap}>
				<input
					accept='image/*'
					className={classes.input}
					id='user-avatar'
					type='file'
					onChange={handleChange}
				/>
				<label htmlFor='user-avatar'>
					<Avatar
						src={avatar || DEFAULT_USER_AVATAR}
						alt='userName'
						className={classes.avatar}
					/>
				</label>
			</Box>
			<Button
				variant='contained'
				onClick={handleClick}
				className={classes.btn}
				endIcon={<CheckCircleOutlineOutlinedIcon />}>
				Готово
			</Button>
		</Box>
	);
};
