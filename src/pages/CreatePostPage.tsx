import { Box, Container, makeStyles, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

import { NavigationPanel } from '../components/navigation/NavigationPanel';

const useStyles = makeStyles({
	inputTitle: {
		width: '100%',
	},
	container: {
		marginTop: '1rem',
	},
	title: {
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: '1.2rem',
	},
});

export const CreatePostPage = () => {
	const classes = useStyles();

	return (
		<Box component='section'>
			<NavigationPanel title='Создать пост' backButton={true} />
			<Container component='div' className={classes.container}>
				<Box component='div'>
					<Typography component='h3' className={classes.title}>
						Create post
					</Typography>
					<TextField
						id='post-title'
						label='Заголовок поста'
						className={classes.inputTitle}
					/>
				</Box>
			</Container>
		</Box>
	);
};
