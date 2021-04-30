import { Box, Button, makeStyles, Paper, Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { FC, ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { User } from '../../store/types';
import { signOut } from '../../store/user/userActions';
import { UserAvatar } from './UserAvatar';

const useStyles = makeStyles({
	profileHeader: {
		marginBottom: '0.7rem',
	},
	userAvatarBlock: {
		textAlign: 'center',
		paddingTop: '1rem',
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
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		paddingBottom: '1rem',
		textAlign: 'center',
	},
	btn: {
		marginRight: '1rem',
		marginLeft: '1rem',
	},
});

interface ProfileHeaderProps {
	onToggleModal: () => void;
	user: User;
	currentUserId: string;
	onClickWrite?: () => void;
	onSubscribe?: () => void;
	isSubscribe?: boolean | undefined;
}

export const ProfileHeader: FC<ProfileHeaderProps> = ({
	onToggleModal,
	user,
	currentUserId,
	onClickWrite,
	onSubscribe,
	isSubscribe,
}): ReactElement => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();

	return (
		<Paper variant='elevation' elevation={3} className={classes.profileHeader}>
			<Box
				component='div'
				className={classes.userAvatarBlock}
				onClick={onToggleModal}>
				<UserAvatar src={user?.photoUrl} alt={user?.name} />
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
					Admninistrator
				</Typography>
			</Box>
			{currentUserId === user._id ? (
				<Box component='div' className={classes.btnWrap}>
					<Button
						variant='outlined'
						className={classes.btn}
						onClick={() => history.push('/update-profile')}>
						Редактировать
					</Button>
					<Button
						variant='outlined'
						className={classes.btn}
						onClick={() => dispatch(signOut())}>
						Выйти
					</Button>
				</Box>
			) : (
				<Box component='div' className={classes.btnWrap}>
					<Button
						variant='outlined'
						className={classes.btn}
						onClick={onClickWrite}>
						Написать
					</Button>
					<Button
						variant='outlined'
						color={isSubscribe ? 'primary' : 'default'}
						className={classes.btn}
						onClick={onSubscribe}>
						{isSubscribe ? 'Отписаться' : 'Подписаться'}
					</Button>
				</Box>
			)}
		</Paper>
	);
};
