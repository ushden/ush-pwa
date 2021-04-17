import { Box, List } from '@material-ui/core';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../components/Loader';
// import { makeStyles } from '@material-ui/styles';
import { NavigationPanel } from '../components/navigation/NavigationPanel';
import { UserListItem } from '../components/usersPage/UserListItem';
import { RootState } from '../store/rootReducer';
import { fetchUsers } from '../store/users/usersActions';

// const useStyles = makeStyles({

// });

export const UsersPage = () => {
	// const classes = useStyles();
	const dispatch = useDispatch();
	const users = useSelector((state: RootState) => state.users.users);
	const loading = useSelector((state: RootState) => state.users.usersLoading);

	useEffect(() => {
		if (users.length === 0) {
			dispatch(fetchUsers());
		}
	}, [dispatch, users.length]);

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
