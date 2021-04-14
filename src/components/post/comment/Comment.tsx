import classNames from 'classnames';
import { Box, Divider, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { CommentHeader } from './CommentHeader';
import { CommentBody } from './CommentBody';
import { CommentFooter } from './CommentFooter';
import { CommentType } from '../../../store/types';

const useStyles = makeStyles({
	comment: {
		width: '100%',
		padding: '0.3rem',
		marginBottom: '0.4rem',
	},
});

interface CommentPropsType {
	comment: CommentType;
}

export const Comment = ({ comment }: CommentPropsType) => {
	const classes = useStyles();

	return (
		<Paper
			component='section'
			className={classNames(classes.comment, 'anim-transform')}>
			<Box component='article'>
				<CommentHeader
					avatar={comment.user.photoUrl}
					name={comment.user.name}
					createAt={comment.createAt}
				/>
				<Divider style={{ marginTop: '0.3rem', marginBottom: '0.3rem' }} />
				<CommentBody comment={comment.text} />
				<Divider style={{ marginTop: '0.3rem', marginBottom: '0.3rem' }} />
				<CommentFooter />
			</Box>
		</Paper>
	);
};
