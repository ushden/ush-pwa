import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { FC, ReactElement } from 'react';
import { COLOR_PRIMARY } from '../../constants/constants';

interface SaveGeneralInfoBtnProps {
	onClickSave: () => void;
}

const useStyles = makeStyles({
	saveBtn: {
		marginBottom: '1rem',
		color: '#fff',
		backgroundColor: COLOR_PRIMARY,
		'&:focus': {
			backgroundColor: COLOR_PRIMARY,
		},
	},
	text: {
		color: COLOR_PRIMARY,
		fontSize: '0.8rem',
		fontWeight: 'lighter',
		marginBottom: '0.2rem',
	},
});

export const SaveGeneralInfoBtn: FC<SaveGeneralInfoBtnProps> = ({
	onClickSave,
}): ReactElement => {
	const classes = useStyles();

	return (
		<>
			<Typography component='p' className={classes.text}>
				При заполнении всех полей, Вас ждет награда :)
			</Typography>
			<Button
				variant='contained'
				className={classes.saveBtn}
				onClick={onClickSave}>
				Сохранить изменения
			</Button>
		</>
	);
};
