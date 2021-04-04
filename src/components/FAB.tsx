import { makeStyles } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from 'react-router';
import { COLOR_DARK } from '../constants/constants';

const useStyles = makeStyles({
	fab: {
		position: 'fixed',
		right: 8,
		bottom: 8,
		backgroundColor: COLOR_DARK,
	},
});

export const FAB = () => {
	const history = useHistory();
	const classes = useStyles();

	const handleClickBtn = () => {
		history.push('/create-post');
	};

	return (
		<Fab
			aria-label='create-post'
			onClick={handleClickBtn}
			className={classes.fab}>
			<AddIcon />
		</Fab>
	);
};
