import {
	Divider,
	List,
	ListItem,
	makeStyles,
	Paper,
	Typography,
} from '@material-ui/core';
import { FC } from 'react';
import { User } from '../../store/types';

const useStyles = makeStyles({
	paper: {
		marginBottom: '0.3rem',
	},
	listItem: {
		justifyContent: 'space-between',
	},
	itemName: {
		fontWeight: 'bolder',
	},
	itemValue: {
		color: '#ccc',
	},
});

interface UserInfoProps {
	user: User;
}

export const UserInfo: FC<UserInfoProps> = ({ user }) => {
	const classes = useStyles();

	return (
		<Paper variant='outlined' elevation={3} className={classes.paper}>
			<List>
				<ListItem className={classes.listItem}>
					<Typography className={classes.itemName}>Email:</Typography>
					<Typography className={classes.itemValue}>{user.email}</Typography>
				</ListItem>
				<Divider />
				<ListItem className={classes.listItem}>
					<Typography className={classes.itemName}>Номер телефона:</Typography>
					<Typography className={classes.itemValue}>{user.phone}</Typography>
				</ListItem>
				<Divider />
				<ListItem className={classes.listItem}>
					<Typography className={classes.itemName}>Гендер:</Typography>
					<Typography className={classes.itemValue}>{user.gender}</Typography>
				</ListItem>
			</List>
		</Paper>
	);
};
