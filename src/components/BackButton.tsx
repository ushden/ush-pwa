import { IconButton, makeStyles } from '@material-ui/core';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import { useHistory } from 'react-router';

const useStyles = makeStyles({
	backBtn: {
		marginRight: '1rem',
		padding: 0,
	},
});

export const BackButton = () => {
	const history = useHistory();
	const classes = useStyles();

	const handleClickButton = () => {
		history.goBack();
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
