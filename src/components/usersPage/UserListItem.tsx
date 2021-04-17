import { Fragment } from 'react';
import {
	Divider,
	ListItem,
	ListItemAvatar,
	ListItemText,
	ListItemSecondaryAction,
	Avatar,
	makeStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { COLOR_PRIMARY } from '../../constants/constants';
import { User } from '../../store/types';

const useStyles = makeStyles({
	listIcon: {
		fontSize: '1rem',
		color: COLOR_PRIMARY,
	},
	link: {
		textDecoration: 'none',
		color: 'inherit',
	},
});

interface UserItemProps {
	user: User;
}

export const UserListItem = ({ user }: UserItemProps) => {
	const classes = useStyles();

	return (
		<Fragment>
			<Link to={`/user/${user._id}`} className={classes.link}>
				<ListItem alignItems='flex-start' button>
					<ListItemAvatar>
						<Avatar alt={user.name} src={user.photoUrl} />
					</ListItemAvatar>
					<ListItemText primary={user.name} secondary={user.email} />
					<ListItemSecondaryAction>
						<ArrowForwardIosIcon className={classes.listIcon} />
					</ListItemSecondaryAction>
				</ListItem>
			</Link>
			<Divider variant='inset' component='li' />
		</Fragment>
	);
};
