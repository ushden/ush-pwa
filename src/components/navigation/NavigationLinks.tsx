import { Button, Divider, List, ListItem } from '@material-ui/core';
import LibraryBooksOutlinedIcon from '@material-ui/icons/LibraryBooksOutlined';
import MessageOutlinedIcon from '@material-ui/icons/MessageOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import NotesOutlinedIcon from '@material-ui/icons/NotesOutlined';
import { makeStyles } from '@material-ui/styles';
import { Link, NavLink } from 'react-router-dom';
import { COLOR_DARK } from '../../constants/constants';
import { signOut } from '../../store/user/userActions';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles({
	navList: {
		width: '14rem',
	},
	navListIcon: {
		marginRight: '1rem',
	},
	navLink: {
		textDecoration: 'none',
		color: COLOR_DARK,
		padding: '0.5rem',
	},
	outBtn: {
		textTransform: 'none',
		fontSize: '1rem',
		color: COLOR_DARK,
	},
});

export const NavigationLinks = () => {
	const classes = useStyles();
	const dispatch = useDispatch();

	return (
		<List className={classes.navList}>
			<ListItem>
				<LibraryBooksOutlinedIcon className={classes.navListIcon} />
				<NavLink
					to='/'
					activeClassName='navigation_link-active'
					className={classes.navLink}>
					Посты
				</NavLink>
			</ListItem>
			<ListItem>
				<NotesOutlinedIcon className={classes.navListIcon} />
				<NavLink
					to='/my-posts'
					activeClassName='navigation_link-active'
					className={classes.navLink}>
					Мои посты
				</NavLink>
			</ListItem>
			<ListItem>
				<MessageOutlinedIcon className={classes.navListIcon} />
				<NavLink
					to='/chats'
					activeClassName='navigation_link-active'
					className={classes.navLink}>
					Чаты
				</NavLink>
			</ListItem>
			<ListItem>
				<AccountCircleOutlinedIcon className={classes.navListIcon} />
				<NavLink
					to='/profile'
					activeClassName='navigation_link-active'
					className={classes.navLink}>
					Профиль
				</NavLink>
			</ListItem>
			<ListItem>
				<SaveOutlinedIcon className={classes.navListIcon} />
				<NavLink
					to='/save'
					activeClassName='navigation_link-active'
					className={classes.navLink}>
					Сохраненные
				</NavLink>
			</ListItem>
			<Divider />
			<ListItem>
				<ExitToAppOutlinedIcon className={classes.navListIcon} />
				<Link to='/' style={{ textDecoration: 'none' }}>
					<Button
						variant='text'
						onClick={() => dispatch(signOut())}
						className={classes.outBtn}>
						Выйти
					</Button>
				</Link>
			</ListItem>
		</List>
	);
};
