import { Box, Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { UserAvatar } from '../usersPage/UserAvatar';
import { selectUser } from '../../store/selectors';

const useStyles = makeStyles({
	userAvatarWrap: {
		textAlign: 'center',
	},
	userAvatar: {
		display: 'inline-block',
		width: '5rem',
		height: '5rem',
		borderRadius: '50%',
	},
	userName: {
		fontSize: '1.2rem',
		fontWeight: 'bold',
	},
	userRole: {
		display: 'block',
		fontWeight: 'lighter',
		fontSize: '0.7rem',
		color: 'lightgray',
	},
});

export const UserArea = () => {
	const classes = useStyles();
	const history = useHistory();
	const { name, photoUrl } = useSelector(selectUser);

	return (
		<Box
			component='div'
			paddingTop={1}
			paddingBottom={1}
			onClick={() => history.push('/profile')}>
			<Box component='div' className={classes.userAvatarWrap}>
				<UserAvatar src={photoUrl} alt={name} />
			</Box>
			{name ? (
				<Typography align='center' component='h3' className={classes.userName}>
					{name}
				</Typography>
			) : (
				<Skeleton variant='text' />
			)}

			<Typography align='center' component='span' className={classes.userRole}>
				Admninistrator
			</Typography>
		</Box>
	);
};
