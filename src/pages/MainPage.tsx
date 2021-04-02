import { Box, Button, Container } from '@material-ui/core';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavigationPanel } from '../components/navigation/NavigationPanel';
import { auth } from '../firebase';
import { getUser } from '../store/user/userActions';

export const MainPage = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getUser());
	});

	return (
		<Box component='section'>
			<NavigationPanel />
			<Container>
				<Button onClick={() => auth.signOut()}>OUT</Button>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
				<p>Hello</p>
			</Container>
		</Box>
	);
};
