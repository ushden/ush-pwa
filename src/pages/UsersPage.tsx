import { Box, List } from '@material-ui/core';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../components/Loader';
// import { makeStyles } from '@material-ui/styles';
import { NavigationPanel } from '../components/navigation/NavigationPanel';
import { UserListItem } from '../components/usersPage/UserListItem';
import { RootState } from '../store/rootReducer';
import { selectUser, selectUsersLoading } from '../store/selectors';
import { getUser } from '../store/user/userActions';
import { fetchUsers } from '../store/users/usersActions';

// const useStyles = makeStyles({

// });

export const UsersPage = () => {
	// const classes = useStyles();
	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	const users = useSelector((state: RootState) =>
		state.users.users.filter((u) => u._id !== user._id)
	);
	const loading = useSelector(selectUsersLoading);

	useEffect(() => {
		if (user._id === '') {
			dispatch(getUser());
		}

		if (users.length === 0) {
			dispatch(fetchUsers());
		}
	}, [dispatch, user._id, users.length]);

	return (
		<Box component='section'>
			<NavigationPanel title='Люди' />
			<List>
				{loading ? (
					<Loader />
				) : (
					users.map((user) => <UserListItem user={user} key={user._id} />)
				)}
			</List>
		</Box>
	);
};
