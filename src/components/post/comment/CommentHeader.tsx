import { Avatar, Box, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { makeStyles } from '@material-ui/styles';

import {
	COLOR_PRIMARY,
	DEFAULT_USER_AVATAR,
} from '../../../constants/constants';

interface PropsType {
	avatar: string | undefined;
	name: string | undefined;
	createAt: string | undefined;
}

const useStyles = makeStyles({
	header: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	userInfo: {
		display: 'flex',
		alignItems: 'center',
	},
	icon: {
		color: COLOR_PRIMARY,
	},
	btn: {
		padding: 0,
	},
	avatar: {
		width: '1.7rem',
		height: '1.7rem',
		marginRight: '0.3rem',
	},
	name: {
		fontWeight: 'bolder',
		color: '#000',
		fontSize: '0.8rem',
		margin: 0,
	},
	data: {
		fontWeight: 'lighter',
		fontSize: '0.6rem',
		color: 'gray',
	},
});

export const CommentHeader = ({ avatar, name, createAt }: PropsType) => {
	const classes = useStyles();

	return (
		<Box component='div' className={classes.header}>
			<Box component='div' className={classes.userInfo}>
				<Avatar
					src={avatar || DEFAULT_USER_AVATAR}
					alt={name}
					className={classes.avatar}
				/>
				<Box component='div'>
					<Box component='p' className={classes.name}>
						{name}
					</Box>
					<Box component='span' className={classes.data}>
						{createAt}
					</Box>
				</Box>
			</Box>
			<Box component='div'>
				<IconButton className={classes.btn}>
					<MoreVertIcon className={classes.icon} />
				</IconButton>
			</Box>
		</Box>
	);
};
