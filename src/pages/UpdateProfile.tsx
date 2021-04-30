import { Box, Typography } from '@material-ui/core';
import { NavigationPanel } from '../components/navigation/NavigationPanel';

export const UpdateProfile = () => {
	return (
		<Box component='section'>
			<NavigationPanel backButton title='Редактировать профиль' />
			<Typography component='h2'>
				Сдесь вы можете редактировать Ваш профиль
			</Typography>
		</Box>
	);
};
