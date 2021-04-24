import { Box, Button, TextField, IconButton } from '@material-ui/core';
import EmojiEmotionsOutlinedIcon from '@material-ui/icons/EmojiEmotionsOutlined';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';

import { COLOR_PRIMARY } from '../../../constants/constants';
import { Loader } from '../../Loader';
import { Emoji } from '../../Emoji';
import { selectCommentsLoading } from '../../../store/selectors';

const useStyles = makeStyles({
	addCommentBlock: {
		width: '100%',
		marginBottom: '0.5rem',
	},
	form: {
		width: '100%',
		marginBottom: '0.4rem',
		backgroundColor: 'ligthgray',
	},
	btnWrap: {
		display: 'flex',
		alignItems: 'center',
		flexWrap: 'wrap',
	},
	btn: {
		backgroundColor: COLOR_PRIMARY,
		color: '#fff',
		marginBottom: '0.5rem',
		'&:hover': {
			backgroundColor: COLOR_PRIMARY,
			color: '#fff',
		},
	},
	emojiPiker: {
		padding: '0.5rem',
		marginLeft: '1rem',
		marginBottom: '0.4rem',
		color: COLOR_PRIMARY,
	},
	emojiPikerIcon: {
		fontSize: '2rem',
		color: COLOR_PRIMARY,
	},
});

interface AddFormPropsType {
	onEmojiClickHandle: any;
	handleAddCommentBtnClick: () => void;
	comment: string;
	setComment: React.Dispatch<React.SetStateAction<string>>;
	visibleEmoji: boolean;
	setVisibleEmoji: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddCommentForm = ({
	onEmojiClickHandle,
	handleAddCommentBtnClick,
	comment,
	setComment,
	visibleEmoji,
	setVisibleEmoji,
}: AddFormPropsType) => {
	const classes = useStyles();
	const loading = useSelector(selectCommentsLoading);

	return (
		<Box component='div' className={classes.addCommentBlock}>
			<Emoji onEmojiClickHandle={onEmojiClickHandle} visible={visibleEmoji} />
			<TextField
				id='add-comment'
				label='Добавить комментарий'
				multiline
				value={comment}
				onChange={(e) => setComment(e.target.value)}
				className={classes.form}
				rows={4}
				variant='filled'
			/>
			{loading ? (
				<Loader />
			) : (
				<Box component='div' className={classes.btnWrap}>
					<Button
						variant='contained'
						className={classes.btn}
						onClick={handleAddCommentBtnClick}>
						Добавить комментарий
					</Button>
					<IconButton
						className={classes.emojiPiker}
						onClick={() => setVisibleEmoji((open) => !open)}>
						<EmojiEmotionsOutlinedIcon className={classes.emojiPikerIcon} />
					</IconButton>
				</Box>
			)}
		</Box>
	);
};
