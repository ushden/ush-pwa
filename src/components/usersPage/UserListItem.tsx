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
import classNames from 'classnames';

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
				<ListItem alignItems='flex-start' button className='anim-scale'>
					<ListItemAvatar className='anim-scale'>
						<Avatar alt={user.name} src={user.photoUrl} />
					</ListItemAvatar>
					<ListItemText
						primary={user.name}
						secondary={user.email}
						className='anim-scale'
					/>
					<ListItemSecondaryAction>
						<ArrowForwardIosIcon
							className={classNames(classes.listIcon, 'anim-scale')}
						/>
					</ListItemSecondaryAction>
				</ListItem>
			</Link>
			<Divider variant='inset' component='li' className='anim-scale' />
		</Fragment>
	);
};
