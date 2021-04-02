import React, { Fragment, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Toolbar from '@material-ui/core/Toolbar';
import { Slide } from '@material-ui/core';
import { NavigationDrawer } from './NavigationDrawer';
import { COLOR_PRIMARY } from '../../constants/constants';
import { makeStyles } from '@material-ui/styles';

const HideOnScroll = ({ children }: { children: React.ReactElement }) => {
	const trigger = useScrollTrigger();

	return (
		<Slide appear={false} direction='down' in={!trigger}>
			{children}
		</Slide>
	);
};

const useStyles = makeStyles({
	navPanel: {
		backgroundColor: COLOR_PRIMARY,
	},
});

export const NavigationPanel = () => {
	const [openMenu, setOpenMenu] = useState(false);

	const classes = useStyles();

	return (
		<Fragment>
			<HideOnScroll>
				<AppBar position='sticky' className={classes.navPanel}>
					<Toolbar>
						<IconButton
							edge='start'
							color='inherit'
							aria-label='menu'
							onClick={() => setOpenMenu((open) => !open)}>
							<MenuIcon />
						</IconButton>
					</Toolbar>
				</AppBar>
			</HideOnScroll>
			<NavigationDrawer openMenu={openMenu} setOpenMenu={setOpenMenu} />
		</Fragment>
	);
};
