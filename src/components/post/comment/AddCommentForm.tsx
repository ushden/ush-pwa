import { Box, Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';

import { COLOR_PRIMARY } from '../../../constants/constants';
import { RootState } from '../../../store/rootReducer';
import { Loader } from '../../Loader';
import { Emoji } from './Emoji';

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
});

interface AddFormPropsType {
	onEmojiClickHandle: any;
	handleAddCommentBtnClick: () => void;
	comment: string;
	setComment: React.Dispatch<React.SetStateAction<string>>;
}

export const AddCommentForm = ({
	onEmojiClickHandle,
	handleAddCommentBtnClick,
	comment,
	setComment,
}: AddFormPropsType) => {
	const classes = useStyles();
	const loading = useSelector(
		(state: RootState) => state.comments.commentsLoading
	);

	return (
		<Box component='div' className={classes.addCommentBlock}>
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
					<Emoji onEmojiClickHandle={onEmojiClickHandle} />
				</Box>
			)}
		</Box>
	);
};
