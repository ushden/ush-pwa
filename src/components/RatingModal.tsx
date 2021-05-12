import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	Divider,
	Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { FC, memo, ReactElement } from 'react';
import { COLOR_PRIMARY } from '../constants/constants';

interface RatingModalModalProps {
	visible: boolean;
	onClose: () => void;
	rating: number | undefined;
}

const useStyles = makeStyles({
	title: {
		color: COLOR_PRIMARY,
		textAlign: 'center',
		fontWeight: 'bolder',
		fontSize: '1.2rem',
		marginBottom: '0.3rem',
	},
	text: {
		fontSize: '0.9rem',
		marginBottom: '0.5rem',
	},
	anotation: {
		color: '#ccc',
		fontSize: '0.7rem',
	},
	calc: {
		fontWeight: 'bolder',
	},
	rating: {
		color: COLOR_PRIMARY,
		fontWeight: 'bolder',
	},
});

export const RatingModal: FC<RatingModalModalProps> = memo(
	({ visible, onClose, rating }): ReactElement => {
		const classes = useStyles();

		return (
			<Dialog open={visible} onClose={onClose} fullWidth>
				<DialogContent style={{ padding: '1rem' }}>
					<Typography component='h4' className={classes.title}>
						За что дают ретинг?
					</Typography>
					<Divider style={{ marginBottom: '0.3rem' }} />
					<Typography component='p' className={classes.text}>
						{' '}
						- За регистрацию <span className={classes.rating}>+100</span>{' '}
						рейтинга
					</Typography>
					<Typography component='p' className={classes.text}>
						{' '}
						- За полное заполнение профиля{' '}
						<span className={classes.rating}>+48</span> рейтинга
					</Typography>
					<Typography component='p' className={classes.text}>
						{' '}
						- За новый прост <span className={classes.rating}>+10</span>{' '}
						рейтинга
					</Typography>
					<Typography component='p' className={classes.text}>
						{' '}
						- За оценку вашему посту{' '}
						<span className={classes.rating}>+5/-5</span> рейтинга
					</Typography>
					<Typography component='p' className={classes.text}>
						{' '}
						- За оценку вашего комментрария{' '}
						<span className={classes.rating}>+1/-1</span> ретингa
					</Typography>
					<Divider />
					<Typography component='p' className={classes.anotation}>
						Весь рейтинг умножается на 0.48
					</Typography>
					{rating ? (
						<Typography component='p' className={classes.calc}>
							Ваш рейтинг <span className={classes.rating}>{rating}</span> *{' '}
							<span style={{ color: 'green' }}>0.48</span> ={' '}
							<span style={{ color: 'red' }}>{Math.floor(rating * 0.48)}</span>
						</Typography>
					) : null}
				</DialogContent>
				<DialogActions>
					<Button variant='text' onClick={onClose}>
						Закрыть
					</Button>
				</DialogActions>
			</Dialog>
		);
	}
);
