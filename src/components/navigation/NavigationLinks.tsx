import { Badge, Button, Divider, List, ListItem } from '@material-ui/core';
import LibraryBooksOutlinedIcon from '@material-ui/icons/LibraryBooksOutlined';
import MessageOutlinedIcon from '@material-ui/icons/MessageOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import SubscriptionsOutlinedIcon from '@material-ui/icons/SubscriptionsOutlined';
import NotesOutlinedIcon from '@material-ui/icons/NotesOutlined';
import { makeStyles } from '@material-ui/styles';
import { Link, NavLink } from 'react-router-dom';
import { COLOR_DARK, COLOR_PRIMARY } from '../../constants/constants';
import { signOut } from '../../store/user/userActions';
import { useDispatch } from 'react-redux';
import { useNewMessageStateGlobal } from '../../hooks/useNewMessageStateGlobal';

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
	const isUserHaveNewMessage = useNewMessageStateGlobal();

	return (
		<List className={classes.navList}>
			<ListItem>
				<LibraryBooksOutlinedIcon className={classes.navListIcon} />
				<NavLink
					to='/'
					activeClassName='navigation_link-active'
					exact
					activeStyle={{ backgroundColor: COLOR_PRIMARY, color: '#fff' }}
					className={classes.navLink}>
					Посты
				</NavLink>
			</ListItem>
			<ListItem>
				<SubscriptionsOutlinedIcon className={classes.navListIcon} />
				<NavLink
					to='/subscribe-posts'
					activeClassName='navigation_link-active'
					exact
					activeStyle={{ backgroundColor: COLOR_PRIMARY, color: '#fff' }}
					className={classes.navLink}>
					Подписки
				</NavLink>
			</ListItem>
			<ListItem>
				<NotesOutlinedIcon className={classes.navListIcon} />
				<NavLink
					to='/my-posts'
					activeClassName='navigation_link-active'
					activeStyle={{ backgroundColor: COLOR_PRIMARY, color: '#fff' }}
					className={classes.navLink}>
					Мои посты
				</NavLink>
			</ListItem>
			<ListItem>
				<MessageOutlinedIcon className={classes.navListIcon} />
				<Badge
					color='secondary'
					badgeContent={'New'}
					invisible={!isUserHaveNewMessage}>
					<NavLink
						to='/chats'
						activeClassName='navigation_link-active'
						activeStyle={{ backgroundColor: COLOR_PRIMARY, color: '#fff' }}
						className={classes.navLink}>
						Чаты
					</NavLink>
				</Badge>
			</ListItem>
			<ListItem>
				<PeopleAltOutlinedIcon className={classes.navListIcon} />
				<NavLink
					to='/users'
					activeClassName='navigation_link-active'
					activeStyle={{ backgroundColor: COLOR_PRIMARY, color: '#fff' }}
					className={classes.navLink}>
					Люди
				</NavLink>
			</ListItem>
			<ListItem>
				<AccountCircleOutlinedIcon className={classes.navListIcon} />
				<NavLink
					to='/profile'
					activeStyle={{ backgroundColor: COLOR_PRIMARY, color: '#fff' }}
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
					activeStyle={{ backgroundColor: COLOR_PRIMARY, color: '#fff' }}
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
