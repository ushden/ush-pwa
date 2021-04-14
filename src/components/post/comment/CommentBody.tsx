import { Box, Typography } from '@material-ui/core';

interface PropsType {
	comment: string;
}

export const CommentBody = ({ comment }: PropsType) => {
	return (
		<Box component='div' style={{ marginBottom: '0.3rem' }}>
			<Typography component='p'>{comment}</Typography>
		</Box>
	);
};
