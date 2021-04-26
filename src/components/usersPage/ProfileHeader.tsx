import { Box, Button, makeStyles, Paper, Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { FC, ReactElement } from 'react';

import { DEFAULT_USER_AVATAR } from '../../constants/constants';
import { User } from '../../store/types';

const useStyles = makeStyles({
	profileHeader: {
		marginBottom: '0.7rem',
	},
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
}

export const ProfileHeader: FC<ProfileHeaderProps> = ({
	onToggleModal,
	user,
	currentUserId,
	onClickWrite,
}): ReactElement => {
	const classes = useStyles();

	return (
		<Paper variant='elevation' elevation={3} className={classes.profileHeader}>
			<Box
				component='div'
				className={classes.userAvatarBlock}
				onClick={onToggleModal}>
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
					Admninistrator
				</Typography>
			</Box>
			{currentUserId === user._id ? (
				<Box component='div' className={classes.btnWrap}>
					<Button variant='outlined' className={classes.btn}>
						Редактировать
					</Button>
					<Button variant='outlined' className={classes.btn}>
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
					<Button variant='outlined' className={classes.btn}>
						Подписаться
					</Button>
				</Box>
			)}
		</Paper>
	);
};
