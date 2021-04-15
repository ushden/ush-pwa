import classNames from 'classnames';
import { Box, IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import ExpandLessOutlinedIcon from '@material-ui/icons/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import BookmarkOutlinedIcon from '@material-ui/icons/BookmarkOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import { COLOR_PRIMARY } from '../../constants/constants';
import { Link } from 'react-router-dom';
import { PostType } from '../../store/types';

const useStyles = makeStyles({
	postFooter: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginTop: '0.7rem',
	},
	postFooterAppraisal: {
		display: 'flex',
		alignItems: 'center',
	},
	postFooterAppraisalBtn: {
		width: '1.5rem',
		height: '1.5rem',
		borderRadius: '0.2rem',
	},
	postLikeBtn: {
		backgroundColor: COLOR_PRIMARY,
		color: '#fff',
		'&:hover': { backgroundColor: COLOR_PRIMARY },
		'&:disabled': {
			backgroundColor: COLOR_PRIMARY,
			color: '#fff',
		},
	},
	postDislikeBtn: {
		backgroundColor: 'red',
		color: '#fff',
		'&:hover': {
			backgroundColor: 'red',
		},
		'&:disabled': {
			backgroundColor: 'red',
			color: '#fff',
		},
	},
	postFooterAppraisalCount: {
		marginLeft: '0.8rem',
		marginRight: '0.8rem',
	},
	postAppraisalCounBtnPress: {
		color: COLOR_PRIMARY,
	},
	postFooterComents: {
		display: 'flex',
		alignItems: 'center',
	},
	postFooterBtn: {
		color: COLOR_PRIMARY,
	},
	skeletonCircle: {
		width: '1.3rem',
		height: '1.3rem',
	},
});

interface PostFooterPropsType {
	like: boolean;
	post: PostType;
	dislike: boolean;
	ratingCount: number;
	commentsCount: number;
	savePost: boolean;
	handleLikeClick: any;
	handleDislikeClick: any;
	handleClickShare: any;
	handleClickSavePost: any;
}

export const PostFooter = ({
	like,
	dislike,
	post,
	ratingCount,
	commentsCount,
	savePost,
	handleLikeClick,
	handleDislikeClick,
	handleClickShare,
	handleClickSavePost,
}: PostFooterPropsType) => {
	const classes = useStyles();

	return (
		<Box component='div' className={classes.postFooter}>
			<Box component='div' className={classes.postFooterAppraisal}>
				<IconButton
					disabled={like}
					className={classNames(
						classes.postFooterAppraisalBtn,
						like ? classes.postLikeBtn : ''
					)}
					onClick={handleLikeClick}>
					<ExpandLessOutlinedIcon />
				</IconButton>
				<Typography component='p' className={classes.postFooterAppraisalCount}>
					{ratingCount ? (
						ratingCount
					) : (
						<Skeleton variant='circle' className={classes.skeletonCircle} />
					)}
				</Typography>
				<IconButton
					disabled={dislike}
					className={classNames(
						classes.postFooterAppraisalBtn,
						dislike ? classes.postDislikeBtn : ''
					)}
					onClick={handleDislikeClick}>
					<ExpandMoreOutlinedIcon />
				</IconButton>
			</Box>
			<Box component='div' className={classes.postFooterComents}>
				<Link to={{ pathname: `/post/${post._id}`, state: post }}>
					<IconButton className={classes.postFooterBtn}>
						<CommentOutlinedIcon />
					</IconButton>
				</Link>
				<Typography component='p'>
					{commentsCount ? (
						commentsCount
					) : (
						<Skeleton variant='circle' className={classes.skeletonCircle} />
					)}
				</Typography>
			</Box>
			<Box component='div'>
				<IconButton
					className={classes.postFooterBtn}
					onClick={handleClickSavePost}>
					{savePost ? <BookmarkOutlinedIcon /> : <BookmarkBorderOutlinedIcon />}
				</IconButton>
			</Box>
			<Box component='div'>
				<IconButton
					className={classes.postFooterBtn}
					onClick={handleClickShare}>
					<ShareOutlinedIcon />
				</IconButton>
			</Box>
		</Box>
	);
};
