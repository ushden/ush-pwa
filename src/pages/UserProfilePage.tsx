import { Box, Paper, Typography, Button, makeStyles } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { NavigationPanel } from '../components/navigation/NavigationPanel';
import { RootState } from '../store/rootReducer';
import { fetchAnotherUser } from '../store/users/usersActions';
import { Modal } from '../components/Modal';
import { DEFAULT_USER_AVATAR } from '../constants/constants';

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
		height: 36,
		display: 'inline-block !important',
	},
	skeletonRole: {
		width: '20%',
		height: 24,
		margin: '0 auto',
	},
	userNameWrap: {
		textAlign: 'center',
		marginBottom: '0.5rem',
	},
	btnWrap: {
		paddingBottom: '1rem',
		textAlign: 'center',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-around',
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

export const UserProfilePage = () => {
	const classes = useStyles();
	const { id }: { id: string } = useParams();
	const dispatch = useDispatch();

	const anotherUser = useSelector(
		(state: RootState) => state.users.anotherUser
	);
	const loading = useSelector((state: RootState) => state.users.usersLoading);

	useEffect(() => {
		dispatch(fetchAnotherUser(id));
	}, [dispatch, id]);

	const [modalVisible, setModalVisible] = useState<boolean>(false);

	const handleToggleModal = () => {
		setModalVisible((visible) => !visible);
	};

	return (
		<Box component='section'>
			<NavigationPanel title='' backButton={true} />
			<Paper variant='elevation' elevation={3}>
				<Box
					component='div'
					className={classes.userAvatarBlock}
					onClick={handleToggleModal}>
					{loading ? (
						<Skeleton variant='circle' className={classes.userAvatar} />
					) : (
						<img
							src={anotherUser?.photoUrl || DEFAULT_USER_AVATAR}
							alt='user'
							className={classes.userAvatar}
						/>
					)}
				</Box>
				<Box component='div' className={classes.userNameWrap}>
					{loading ? (
						<Skeleton variant='text' className={classes.skeletonText} />
					) : (
						<Typography
							align='center'
							component='h3'
							className={classes.profileUserName}>
							{anotherUser?.name}
						</Typography>
					)}
					{loading ? (
						<Skeleton variant='text' className={classes.skeletonRole} />
					) : (
						<Typography
							align='center'
							component='span'
							className={classes.userRole}>
							loh
						</Typography>
					)}
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
					<Button variant='outlined'>Написать</Button>
					<Button variant='outlined'>Подписаться</Button>
				</Box>
			</Paper>
			<Modal
				visible={modalVisible}
				onCloseModal={handleToggleModal}
				photoUrl={anotherUser?.photoUrl}
			/>
		</Box>
	);
};
