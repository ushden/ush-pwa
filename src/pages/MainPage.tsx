import { Box, Container } from '@material-ui/core';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FAB } from '../components/FAB';
import { NavigationPanel } from '../components/navigation/NavigationPanel';
import { Post } from '../components/post/Post';
import { getUser } from '../store/user/userActions';

export const MainPage = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getUser());
	}, [dispatch]);

	return (
		<Box component='section'>
			<NavigationPanel title='Посты' />
			<Container>
				<Post />
				<Post />
			</Container>
			<FAB />
		</Box>
	);
};
