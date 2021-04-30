import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/DeleteForeverOutlined';
import ShareIcon from '@material-ui/icons/ShareOutlined';
import { makeStyles, Typography, Box, IconButton } from '@material-ui/core';
import { Message } from '../../store/types';
import { COLOR_PRIMARY } from '../../constants/constants';

interface ModalProps {
	open: boolean;
	onClose: any;
	message: Message | null;
	onDeleteClick: () => void;
}

const useStyles = makeStyles({
	img: {
		maxWidth: '100%',
		objectFit: 'contain',
	},
	name: {
		fontWeight: 'bolder',
	},
	text: {
		backgroundColor: COLOR_PRIMARY,
		color: '#fff',
		padding: '1rem',
		borderRadius: '1rem',
	},
	data: {
		fontWeight: 'lighter',
		fontSize: '0.7rem',
	},
	messageInfo: {
		display: 'flex',
		flexDirection: 'column',
	},
	dialogActions: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	deleteBtn: {
		color: 'red',
	},
	shareBtn: {
		color: COLOR_PRIMARY,
	},
});

export const MessageModal = ({
	open,
	onClose,
	message,
	onDeleteClick,
}: ModalProps) => {
	const classes = useStyles();

	return (
		<Dialog open={open} maxWidth='xl'>
			<DialogContent>
				{message?.text ? (
					<Box className={classes.messageInfo}>
						<Typography component='span' className={classes.name}>
							{message.user.name}
						</Typography>
						<Typography component='span' className={classes.text}>
							{message.text}
						</Typography>
						<Typography component='span' className={classes.data}>
							{message.createdAt}
						</Typography>
					</Box>
				) : (
					<img
						src={message?.image}
						alt={message?.user.name}
						className={classes.img}
					/>
				)}
			</DialogContent>
			<DialogActions className={classes.dialogActions}>
				<Box component='div'>
					<IconButton onClick={onDeleteClick}>
						<DeleteIcon className={classes.deleteBtn} />
					</IconButton>
					<IconButton>
						<ShareIcon className={classes.shareBtn} />
					</IconButton>
				</Box>
				<Box component='div'>
					<Button onClick={onClose} variant='text'>
						Закрыть
					</Button>
				</Box>
			</DialogActions>
		</Dialog>
	);
};
