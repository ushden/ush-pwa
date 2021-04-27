import { Box, List } from '@material-ui/core';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../components/Loader';
import { NavigationPanel } from '../components/navigation/NavigationPanel';
import { UserListItem } from '../components/usersPage/UserListItem';
import {
	selectUser,
	selectUsers,
	selectUsersLoading,
} from '../store/selectors';
import { getUser } from '../store/user/userActions';
import { fetchUsers } from '../store/users/usersActions';

export const UsersPage = () => {
	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	const users = useSelector(selectUsers).filter((u) => u._id !== user._id);
	const loading = useSelector(selectUsersLoading);

	useEffect(() => {
		if (!user._id) {
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
