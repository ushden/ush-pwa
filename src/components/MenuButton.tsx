import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/styles';

interface PropsType {
	setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const useStyles = makeStyles({
	menuBtn: {
		marginRight: '1rem',
		padding: 0,
	},
});

export const MenuButton = ({ setOpenMenu }: PropsType) => {
	const classes = useStyles();

	return (
		<IconButton
			className={classes.menuBtn}
			color='inherit'
			aria-label='menu'
			onClick={() => setOpenMenu((open) => !open)}>
			<MenuIcon />
		</IconButton>
	);
};
