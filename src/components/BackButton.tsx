import { IconButton, makeStyles } from '@material-ui/core';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { resetAnotherUser } from '../store/users/usersActions';

const useStyles = makeStyles({
	backBtn: {
		marginRight: '1rem',
		padding: 0,
	},
});

export const BackButton = () => {
	const history = useHistory();
	const classes = useStyles();
	const dispatch = useDispatch();

	const handleClickButton = () => {
		history.goBack();
		dispatch(resetAnotherUser());
	};

	return (
		<IconButton
			onClick={handleClickButton}
			className={classes.backBtn}
			color='inherit'>
			<ArrowBackOutlinedIcon />
		</IconButton>
	);
};
