import React, { Fragment, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Toolbar from '@material-ui/core/Toolbar';
import { Slide, Typography } from '@material-ui/core';
import { NavigationDrawer } from './NavigationDrawer';
import { COLOR_PRIMARY } from '../../constants/constants';
import { makeStyles } from '@material-ui/styles';
import { MenuButton } from '../MenuButton';
import { BackButton } from '../BackButton';

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

interface PropsType {
	title: string;
	backButton?: boolean;
}

export const NavigationPanel = ({ title, backButton }: PropsType) => {
	const [openMenu, setOpenMenu] = useState(false);

	const classes = useStyles();

	return (
		<Fragment>
			<HideOnScroll>
				<AppBar position='sticky' className={classes.navPanel}>
					<Toolbar>
						{backButton ? (
							<BackButton />
						) : (
							<MenuButton setOpenMenu={setOpenMenu} />
						)}
						<Typography component='h2'>{title}</Typography>
					</Toolbar>
				</AppBar>
			</HideOnScroll>
			<NavigationDrawer openMenu={openMenu} setOpenMenu={setOpenMenu} />
		</Fragment>
	);
};
