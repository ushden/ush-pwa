import { makeStyles } from '@material-ui/styles';
import { FC, ReactElement } from 'react';

const useStyles = makeStyles({
	container: {
		display: 'flex',
		flexDirection: 'column',
		height: 'calc(100vh - 56px)',
	},
});

export const ChatContainer: FC = ({ children }): ReactElement => {
	const classes = useStyles();

	return <div className={classes.container}>{children}</div>;
};
