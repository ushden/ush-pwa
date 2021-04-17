import { Box, makeStyles } from '@material-ui/core';
import classNames from 'classnames';

interface SplashProps {
	visible: boolean;
}

const useStyles = makeStyles({
	splash: {
		backgroundColor: '#fff',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100vw',
		height: '100vh',
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		zIndex: 9999,
	},
	img: {
		maxWidth: '100%',
		width: '12rem',
		objectFit: 'contain',
	},
	hide: {
		opacity: 0,
		visibility: 'hidden',
		transform: 'translateX(-500px)',
		transition: '0.8s',
		// display: 'none',
	},
});

export const Splash = ({ visible }: SplashProps) => {
	const classes = useStyles();

	return (
		<Box
			component='div'
			className={classNames(classes.splash, visible ? null : classes.hide)}>
			<img
				src='/images/icons/icon-512x512.png'
				alt='Splash'
				className={classes.img}
			/>
		</Box>
	);
};
