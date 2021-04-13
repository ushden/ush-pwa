import { Box, Typography } from '@material-ui/core';
import { DEFAULT_USER_AVATAR } from '../../constants/constants';

import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';

const useStyles = makeStyles({
	userAvatarWrap: {
		textAlign: 'center',
	},
	userAvatar: {
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
	const { name, photoUrl } = useSelector((state: RootState) => state.user.user);

	return (
		<Box
			component='div'
			paddingTop={1}
			paddingBottom={1}
			onClick={() => console.log('go to profile')}>
			<Box component='div' className={classes.userAvatarWrap}>
				<img
					src={photoUrl || DEFAULT_USER_AVATAR}
					alt='user'
					className={classes.userAvatar}
				/>
			</Box>
			<Typography align='center' component='h3' className={classes.userName}>
				{name}
			</Typography>
			<Typography align='center' component='span' className={classes.userRole}>
				loh
			</Typography>
		</Box>
	);
};
