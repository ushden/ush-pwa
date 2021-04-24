import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from '@material-ui/core';

export const InstalModal = () => {
	return (
		<Dialog open={true}>
			<DialogTitle>Title</DialogTitle>
			<DialogContent>Content</DialogContent>
			<DialogActions>Actions</DialogActions>
		</Dialog>
	);
};
