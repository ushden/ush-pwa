import { Box, IconButton } from '@material-ui/core';
import Smile from '@material-ui/icons/SentimentSatisfiedOutlined';
import Sad from '@material-ui/icons/SentimentDissatisfiedOutlined';
import Dead from '@material-ui/icons/SentimentVeryDissatisfiedOutlined';
import Anime from '@material-ui/icons/SentimentVerySatisfiedOutlined';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
	btn: {
		padding: 0,
	},
	footer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
});

export const CommentFooter = () => {
	const classes = useStyles();

	return (
		<Box component='div' className={classes.footer}>
			<IconButton className={classes.btn}>
				<Smile />
				<Box component='span'>0</Box>
			</IconButton>
			<IconButton className={classes.btn}>
				<Sad />
				<Box component='span'>0</Box>
			</IconButton>
			<IconButton className={classes.btn}>
				<Dead />
				<Box component='span'>0</Box>
			</IconButton>
			<IconButton className={classes.btn}>
				<Anime />
				<Box component='span'>0</Box>
			</IconButton>
		</Box>
	);
};
