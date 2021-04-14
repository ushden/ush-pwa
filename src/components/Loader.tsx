import { Box } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

export const Loader = () => {
	return (
		<Box
			component='div'
			style={{
				width: '100vw',
				height: '100vh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}>
			<CircularProgress />
		</Box>
	);
};
