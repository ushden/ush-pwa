import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import { COLOR_DARK, EMPTY_IMAGE } from '../../constants/constants';
import { PostType } from '../../store/types';

interface PostBodyPropsType {
	post: PostType;
}

const useStyles = makeStyles({
	postBody: {
		marginBottom: '0.7rem',
	},
	postBodyTitle: {
		fontSize: '1.2rem',
		fontWeight: 'bold',
	},
	postBodyTitleLink: {
		textDecoration: 'none',
		color: COLOR_DARK,
	},
	postBodyImgWrap: {
		width: '100%',
	},
	postBodyImg: {
		maxWidth: '100%',
		objectFit: 'contain',
	},
});

export const PostBody = ({ post }: PostBodyPropsType) => {
	const classes = useStyles();

	return (
		<Box component='div' className={classes.postBody}>
			<Typography component='h3' className={classes.postBodyTitle}>
				<Link
					to={{ pathname: `/post/${post._id}`, state: post }}
					className={classes.postBodyTitleLink}>
					{post.title}
				</Link>
			</Typography>
			<Box component='div' className={classes.postBodyImgWrap}>
				<img
					src={post.image || EMPTY_IMAGE}
					alt={post.title}
					className={classes.postBodyImg}
				/>
			</Box>
			<Typography component='p'>{post.description}</Typography>
		</Box>
	);
};
