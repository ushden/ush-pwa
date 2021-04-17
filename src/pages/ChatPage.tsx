import { Box } from '@material-ui/core';
import { NavigationPanel } from '../components/navigation/NavigationPanel';

export const ChatPage = () => {
	return (
		<Box component='section'>
			<NavigationPanel title='user name' backButton />
		</Box>
	);
};
