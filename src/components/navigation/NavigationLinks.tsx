import { List, ListItem } from '@material-ui/core';
import LibraryBooksOutlinedIcon from '@material-ui/icons/LibraryBooksOutlined';
import MessageOutlinedIcon from '@material-ui/icons/MessageOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
	navList: {
		width: '10rem',
	},
	navListIcon: {
		marginRight: '1rem',
	},
});

export const NavigationLinks = () => {
	const classes = useStyles();

	return (
		<List className={classes.navList}>
			<ListItem>
				<LibraryBooksOutlinedIcon className={classes.navListIcon} />
				<p>Posts</p>
			</ListItem>
			<ListItem>
				<MessageOutlinedIcon className={classes.navListIcon} />
				<p>Chats</p>
			</ListItem>
			<ListItem>
				<AccountCircleOutlinedIcon className={classes.navListIcon} />
				<p>Profile</p>
			</ListItem>
		</List>
	);
};
