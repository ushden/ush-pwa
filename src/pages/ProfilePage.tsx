import { Box, Button, makeStyles, Paper, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Skeleton from '@material-ui/lab/Skeleton';

import { NavigationPanel } from '../components/navigation/NavigationPanel';
import { DEFAULT_USER_AVATAR } from '../constants/constants';
import { RootState } from '../store/rootReducer';
import { Modal } from '../components/ImageModal';
import { useEffect, useState } from 'react';
import { getUser } from '../store/user/userActions';
import { Post } from '../components/post/Post';

const useStyles = makeStyles({
	userAvatarBlock: {
		textAlign: 'center',
		paddingTop: '1rem',
	},
	userAvatar: {
		display: 'inline-block !important',
		width: '10rem !important',
		height: '10rem !important',
		borderRadius: '50% !important',
	},
	profileUserName: {
		fontSize: '1.5rem',
		fontWeight: 'bold',
	},
	userRole: {
		display: 'block',
		fontWeight: 'lighter',
		fontSize: '1rem',
		color: 'lightgray',
	},
	skeletonText: {
		width: '70%',
		display: 'inline-block !important',
	},
	userNameWrap: {
		textAlign: 'center',
		marginBottom: '0.5rem',
	},
	btnWrap: {
		paddingBottom: '1rem',
		textAlign: 'center',
	},
	infoWrap: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-around',
		marginBottom: '0.5rem',
	},
	infoName: {
		fontSize: '1.1rem',
		textAlign: 'center',
	},
	infoCount: {
		fontWeight: 'lighter',
		textAlign: 'center',
	},
});

export const ProfilePage = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const user = useSelector((state: RootState) => state.user.user);
	const posts = useSelector((state: RootState) =>
		state.posts.posts.filter((post) => post.user._id === user._id)
	);
	const [modalVisible, setModalVisible] = useState<boolean>(false);

	const handleToggleModal = () => {
		setModalVisible((visible) => !visible);
	};

	useEffect(() => {
		if (!user._id) {
			dispatch(getUser());
		}
	}, [dispatch, user._id]);

	return (
		<Box component='section'>
			<NavigationPanel title='Профиль' />
			<Paper variant='elevation' elevation={3}>
				<Box
					component='div'
					className={classes.userAvatarBlock}
					onClick={handleToggleModal}>
					{user?.photoUrl ? (
						<img
							src={user?.photoUrl || DEFAULT_USER_AVATAR}
							alt='user'
							className={classes.userAvatar}
						/>
					) : (
						<Skeleton variant='circle' className={classes.userAvatar} />
					)}
				</Box>
				<Box component='div' className={classes.userNameWrap}>
					{user?.name ? (
						<Typography
							align='center'
							component='h3'
							className={classes.profileUserName}>
							{user?.name}
						</Typography>
					) : (
						<Skeleton variant='text' className={classes.skeletonText} />
					)}

					<Typography
						align='center'
						component='span'
						className={classes.userRole}>
						loh
					</Typography>
				</Box>
				<Box component='div' className={classes.infoWrap}>
					<Box component='div'>
						<Typography component='h4' className={classes.infoName}>
							Постов
						</Typography>
						<Typography component='p' className={classes.infoCount}>
							0
						</Typography>
					</Box>
					<Box component='div'>
						<Typography component='h4' className={classes.infoName}>
							Подписчиков
						</Typography>
						<Typography component='p' className={classes.infoCount}>
							0
						</Typography>
					</Box>
					<Box component='div'>
						<Typography component='h4' className={classes.infoName}>
							Подписок
						</Typography>
						<Typography component='p' className={classes.infoCount}>
							0
						</Typography>
					</Box>
				</Box>
				<Box component='div' className={classes.btnWrap}>
					<Button variant='outlined'>Редактировать профиль</Button>
				</Box>
			</Paper>
			<Box>
				{posts.map((post) => (
					<Post post={post} id={post._id} key={post._id} />
				))}
			</Box>
			<Modal
				visible={modalVisible}
				onCloseModal={handleToggleModal}
				photoUrl={user?.photoUrl}
			/>
		</Box>
	);
};
