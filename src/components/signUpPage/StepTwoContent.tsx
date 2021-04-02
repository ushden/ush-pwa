import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import FaceOutlinedIcon from '@material-ui/icons/FaceOutlined';
import { COLOR_DARK } from '../../constants/constants';
import classesName from 'classnames';

const useStyles = makeStyles({
	container: {
		textAlign: 'center',
	},
	title: {
		fontSize: '1rem',
		fontWeight: 'bolder',
	},
	small: {
		fontSize: '0.8rem',
		color: 'gray',
	},
	icon: {
		color: COLOR_DARK,
	},
	form: {
		marginTop: '1rem',
	},
	content: {
		borderRadius: '1rem',
		backgroundColor: '#fff',
		padding: '1rem',
		paddingBottom: '3rem',
		paddingTop: '3rem',
	},
});

export const StepTwoContent = ({
	name,
	setName,
}: {
	name: string;
	setName: React.Dispatch<React.SetStateAction<string>>;
}) => {
	const classes = useStyles();

	return (
		<Box component='div' className={classes.container}>
			<Box
				component='div'
				className={classesName(classes.content, 'anim-transform')}>
				<Typography component='h3' className={classes.title}>
					Ваше имя
				</Typography>
				<Typography component='p' className={classes.small}>
					Пожалуйста, используйте Ваше настоящее имя!
				</Typography>
				<FormControl className={classes.form}>
					<InputLabel htmlFor='input-name'>Имя</InputLabel>
					<Input
						id='input-name'
						placeholder='Владислав'
						required
						type='text'
						value={name}
						onChange={(e) => setName(e.target.value)}
						startAdornment={
							<InputAdornment position='start'>
								<FaceOutlinedIcon className={classes.icon} />
							</InputAdornment>
						}
					/>
				</FormControl>
			</Box>
		</Box>
	);
};
