import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { Container, Divider } from '@material-ui/core';
import { UserArea } from './UserArea';
import { NavigationLinks } from './NavigationLinks';

export const NavigationDrawer = (props: {
	openMenu: boolean;
	setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const { openMenu, setOpenMenu } = props;

	return (
		<SwipeableDrawer
			variant='temporary'
			open={openMenu}
			onOpen={() => setOpenMenu(true)}
			onClose={() => setOpenMenu(false)}>
			<Container>
				<UserArea />
			</Container>
			<Divider />
			<NavigationLinks />
		</SwipeableDrawer>
	);
};
