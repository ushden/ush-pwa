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
	ratingCount: number | null;
	commentsCount: number | null;
	isSavePost: boolean;
	handleLikeClick: () => void;
	handleDislikeClick: () => void;
	handleClickShare: () => void;
	handleClickSavePost: () => void;
}

export const PostFooter = (props: PostFooterPropsType) => {
	const classes = useStyles();
	const { post } = props;

	return (
		<Box component='div' className={classes.postFooter}>
			<Box component='div' className={classes.postFooterAppraisal}>
				<IconButton
					disabled={props.like}
					className={classNames(
						classes.postFooterAppraisalBtn,
						props.like ? classes.postLikeBtn : ''
					)}
					onClick={props.handleLikeClick}>
					<ExpandLessOutlinedIcon />
				</IconButton>
				<Typography component='p' className={classes.postFooterAppraisalCount}>
					{props.ratingCount === null ? (
						<Skeleton variant='circle' className={classes.skeletonCircle} />
					) : (
						props.ratingCount
					)}
				</Typography>
				<IconButton
					disabled={props.dislike}
					className={classNames(
						classes.postFooterAppraisalBtn,
						props.dislike ? classes.postDislikeBtn : ''
					)}
					onClick={props.handleDislikeClick}>
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
					{props.commentsCount === null ? (
						<Skeleton variant='circle' className={classes.skeletonCircle} />
					) : (
						props.commentsCount
					)}
				</Typography>
			</Box>
			<Box component='div'>
				<IconButton
					className={classes.postFooterBtn}
					onClick={props.handleClickSavePost}>
					{props.isSavePost ? (
						<BookmarkOutlinedIcon />
					) : (
						<BookmarkBorderOutlinedIcon />
					)}
				</IconButton>
			</Box>
			<Box component='div'>
				<IconButton
					className={classes.postFooterBtn}
					onClick={props.handleClickShare}>
					<ShareOutlinedIcon />
				</IconButton>
			</Box>
		</Box>
	);
};
