import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	List,
	Typography,
} from '@material-ui/core';
import { FC } from 'react';
import { User } from '../store/types';
import { UserListItem } from './usersPage/UserListItem';

interface FollowersListModalProps {
	visible: boolean;
	onClose: () => void;
	users: Array<User>;
}

export const FollowersListModal: FC<FollowersListModalProps> = ({
	visible,
	onClose,
	users,
}) => {
	return (
		<Dialog open={visible} onClose={onClose} fullWidth>
			<DialogContent style={{ padding: 0 }}>
				<List>
					{users.length === 0 ? (
						<Typography
							component='h4'
							style={{ color: '#ccc', textAlign: 'center' }}>
							У Вас нету подписчиков! Создайте новый пост, что-бы заинтересовать
							людей :)
						</Typography>
					) : (
						users.map((user) => <UserListItem user={user} key={user._id} />)
					)}
				</List>
			</DialogContent>
			<DialogActions>
				<Button variant='text' onClick={onClose}>
					Закрыть
				</Button>
			</DialogActions>
		</Dialog>
	);
};
