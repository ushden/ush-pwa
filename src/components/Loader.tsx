import CircularProgress from '@material-ui/core/CircularProgress';
import { COLOR_PRIMARY } from '../constants/constants';

export const Loader = () => {
	return <CircularProgress style={{ color: COLOR_PRIMARY, padding: '2rem' }} />;
};
