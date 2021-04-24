import {
	Avatar,
	Box,
	Button,
	Fade,
	IconButton,
	Menu,
	MenuItem,
	Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import { makeStyles } from '@material-ui/styles';
import { COLOR_PRIMARY } from '../../constants/constants';
import { PostType } from '../../store/types';
import { Modal } from '../ImageModal';

const useStyles = makeStyles({
	postHeader: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: '0.4rem',
	},
	postInfo: {
		display: 'flex',
		alignItems: 'center',
	},
	postInfoWrap: {
		marginLeft: '0.4rem',
	},
	postInfoAvatar: {
		width: '1.7rem',
		height: '1.7rem',
	},
	postInfoAvatarBtn: {
		padding: 0,
	},
	postInfoName: {
		fontSize: '0.8rem',
	},
	postInfoNameLink: {
		textDecoration: 'none',
		color: 'inherit',
	},
	postInfoData: {
		color: '#ccc',
		fontSize: '0.6rem',
		fontWeight: 'lighter',
	},
	postMenu: {
		display: 'flex',
		justifyContent: 'end',
		position: 'relative',
	},
	postMenuDelete: {
		padding: 0,
		fontWeight: 'inherit',
		alignItems: 'center',
	},
	postMenuBtn: {
		padding: 0,
		color: COLOR_PRIMARY,
	},
	postMenuIcon: {
		color: COLOR_PRIMARY,
	},
	menuItem: {
		padding: '0 0.2rem',
	},
});

interface PostHeaderPropsType {
	post: PostType;
	anchorEl: HTMLElement | null;
	handleMenuCloseClick: () => void;
	handleDeletePostClick: () => void;
	handleMenuOpenClick: (event: React.MouseEvent<HTMLElement>) => void;
	handleVisibleModalAvatar: () => void;
	openModalAvatar: boolean;
}

export const PostHeader = (props: PostHeaderPropsType) => {
	const classes = useStyles();
	const { post } = props;

	return (
		<Box component='div' className={classes.postHeader}>
			<Box className={classes.postInfo} component='div'>
				<IconButton
					className={classes.postInfoAvatarBtn}
					onClick={props.handleVisibleModalAvatar}>
					<Avatar
						src={post.user.photoUrl}
						className={classes.postInfoAvatar}
						alt={post.user.name}
					/>
				</IconButton>
				<Box component='div' className={classes.postInfoWrap}>
					<Typography component='h4' className={classes.postInfoName}>
						<Link
							to={`/user/${post.user._id}`}
							className={classes.postInfoNameLink}>
							{post.user.name}
						</Link>
					</Typography>
					<Typography component='p' className={classes.postInfoData}>
						{post.createAt}
					</Typography>
				</Box>
			</Box>
			<Box className={classes.postMenu} component='div'>
				<Menu
					id='post-menu'
					TransitionComponent={Fade}
					anchorEl={props.anchorEl}
					open={Boolean(props.anchorEl)}
					onClose={props.handleMenuCloseClick}
					keepMounted>
					<MenuItem className={classes.menuItem}>
						<Button
							variant='text'
							className={classes.postMenuDelete}
							onClick={props.handleDeletePostClick}>
							<DeleteForeverOutlinedIcon
								style={{ color: COLOR_PRIMARY, marginRight: '0.2rem' }}
							/>
							Удалить пост
						</Button>
					</MenuItem>
				</Menu>
				<IconButton
					className={classes.postMenuBtn}
					aria-label='menu'
					aria-controls='post-menu'
					onClick={props.handleMenuOpenClick}>
					<MoreVertIcon className={classes.postMenuIcon} />
				</IconButton>
			</Box>
			<Modal
				visible={props.openModalAvatar}
				onCloseModal={props.handleVisibleModalAvatar}
				photoUrl={post.user.photoUrl}
			/>
		</Box>
	);
};
