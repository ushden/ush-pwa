import { Box } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { FC, ReactElement } from 'react';

export const Loader: FC = (): ReactElement => {
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
