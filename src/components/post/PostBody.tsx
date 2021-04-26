import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { Link } from 'react-router-dom';
import { COLOR_DARK } from '../../constants/constants';
import { PostType } from '../../store/types';
import { Image } from '../Image';
interface PostBodyPropsType {
	post: PostType;
	onOpenModalHandle: () => void;
}

const useStyles = makeStyles({
	postBody: {
		marginBottom: '0.7rem',
		width: '100%',
	},
	postBodyTitle: {
		fontSize: '1.2rem',
		fontWeight: 'bold',
		marginBottom: '0.5rem',
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

export const PostBody = ({ post, onOpenModalHandle }: PostBodyPropsType) => {
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
				<Image
					src={post.image}
					alt={post.title}
					className={classes.postBodyImg}
					onClick={onOpenModalHandle}
				/>
			</Box>
			<Typography component='p'>{post.description}</Typography>
		</Box>
	);
};
