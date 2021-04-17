import { Box } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

export const Loader = () => {
	return (
		<Box
			component='div'
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				marginTop: '2rem',
			}}>
			<CircularProgress />
		</Box>
	);
};
