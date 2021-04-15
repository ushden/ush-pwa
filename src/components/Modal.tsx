import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import { COLOR_PRIMARY } from '../constants/constants';

interface ModalProps {
	visible: boolean;
	onCloseModal: () => void;
	photoUrl: string;
}

const useStyles = makeStyles({
	modal: {
		width: 'calc(100% - 0.1rem)',
		margin: 0,
	},
	btn: {
		color: COLOR_PRIMARY,
		fontSize: '0.8rem',
		fontWeight: 'lighter',
	},
	img: {
		width: '100%',
		maxWidth: '100%',
	},
	content: {
		padding: '0.1rem',
		'&:first-child': {
			paddingTop: '0.1rem',
		},
	},
	actions: {
		padding: '0.2rem',
	},
});

export const Modal = ({ visible, onCloseModal, photoUrl }: ModalProps) => {
	const classes = useStyles();

	return (
		<Dialog
			open={visible}
			fullWidth={true}
			onClose={onCloseModal}
			classes={{ paperFullWidth: classes.modal }}
			maxWidth='xl'>
			<DialogContent className={classes.content}>
				<img src={photoUrl} alt='Social Ush PWA' className={classes.img} />
			</DialogContent>
			<DialogActions className={classes.actions}>
				<Button onClick={onCloseModal} variant='text' className={classes.btn}>
					Закрыть
				</Button>
			</DialogActions>
		</Dialog>
	);
};
