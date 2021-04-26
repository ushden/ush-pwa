import { Box, List, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ListChatItem } from '../components/chats/ListChatItem';
import { Loader } from '../components/Loader';
import { NavigationPanel } from '../components/navigation/NavigationPanel';
import { CHATS } from '../constants/constants';
import { firestore } from '../firebase';
import { fetchChats } from '../store/chats/chatActions';
import {
	selectChats,
	selectChatsLoading,
	selectUser,
} from '../store/selectors';
import { getUser } from '../store/user/userActions';

const useStyles = makeStyles({
	emptyChatsList: {
		color: '#ccc',
		textAlign: 'center',
		marginTop: '2rem',
		fontWeight: 'lighter',
		fontSize: '1rem',
	},
});

export const ChatsPage = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	const chats = useSelector(selectChats).filter(
		(chat) =>
			chat.users.firstUser._id === user._id ||
			chat.users.secondUser._id === user._id
	);
	const loading = useSelector(selectChatsLoading);

	useEffect(() => {
		if (!user._id) {
			dispatch(getUser());
		}
	}, [dispatch, user._id]);

	useEffect(() => {
		const unsubscribe = firestore.collection(CHATS).onSnapshot(() => {
			dispatch(fetchChats());
		});

		return () => unsubscribe();
	}, [dispatch]);

	return (
		<Box component='section'>
			<NavigationPanel title='Чаты' />
			{loading ? (
				<Loader />
			) : (
				<Box>
					{chats.length === 0 && (
						<Typography component='p' className={classes.emptyChatsList}>
							Напиши кому-то!
						</Typography>
					)}
					<List>
						{chats.map((chat) => (
							<ListChatItem chat={chat} key={chat._id} />
						))}
					</List>
				</Box>
			)}
		</Box>
	);
};
