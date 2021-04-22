import {
	Box,
	Button,
	Container,
	makeStyles,
	Typography,
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../components/Loader';

import { NavigationPanel } from '../components/navigation/NavigationPanel';
import {
	ALERT_ERROR,
	COLOR_PRIMARY,
	EMPTY_IMAGE,
} from '../constants/constants';
import { showAlert } from '../store/alert/alertActions';
import { createPost } from '../store/posts/postsActions';
import { RootState } from '../store/rootReducer';
import { PostType } from '../store/types';

const useStyles = makeStyles({
	inputTitle: {
		width: '100%',
		marginBottom: '1rem',
	},
	inputDesc: {
		width: '100%',
		marginBottom: '1rem',
	},
	container: {
		marginTop: '1rem',
		maxWidth: 600,
		textAlign: 'center',
	},
	title: {
		fontWeight: 'bold',
		fontSize: '1.2rem',
		marginBottom: '1rem',
	},
	hiddenInput: {
		display: 'none',
	},
	emptyImage: {
		maxWidth: '100%',
		objectFit: 'contain',
	},
	createBtn: {
		margin: '1rem 0',
		backgroundColor: COLOR_PRIMARY,
		color: '#fff',
	},
});

export const CreatePostPage = () => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const user = useSelector((state: RootState) => state.user.user);
	const loading = useSelector((state: RootState) => state.posts.postLoading);

	const [title, setTitle] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [image, setImage] = useState<any>('');

	const handleChange = async (e: React.ChangeEvent<HTMLInputElement> | any) => {
		const file = e.target.files?.item(0);
		const reader = new FileReader();

		reader.onload = (e) => {
			const result = e.target?.result;
			setImage(result);
		};

		reader.readAsDataURL(file);
	};

	const handleClick = () => {
		if (title === '') {
			return dispatch(showAlert(ALERT_ERROR, 'Напишите заголовок'));
		}

		if (image === '' && description === '') {
			return dispatch(
				showAlert(ALERT_ERROR, 'Добавьте изображение или описание')
			);
		}

		const post: PostType = {
			_id: Date.now().toString(),
			title,
			description,
			image,
			rating: 0,
			comments: 0,
			createAt: new Date().toLocaleString(),
			user: { ...user },
		};

		dispatch(createPost(post));

		setTitle('');
		setDescription('');
		setImage(null);
	};

	return (
		<Box component='section'>
			<NavigationPanel title='Создать пост' backButton={true} />
			<Container component='div' className={classes.container}>
				<Box component='div'>
					<Typography component='h3' className={classes.title}>
						Создай новый пост
					</Typography>
					<TextField
						label='Заголовок'
						variant='filled'
						value={title}
						onChange={(e) => setTitle(e.currentTarget.value)}
						className={classes.inputTitle}
					/>
					<TextField
						label='Описание'
						multiline
						rows={4}
						variant='filled'
						className={classes.inputDesc}
						rowsMax={4}
						value={description}
						onChange={(e) => setDescription(e.currentTarget.value)}
					/>
					<Typography component='p'>Добавь картинку</Typography>
					<input
						accept='image/*'
						className={classes.hiddenInput}
						id='post-input-image'
						type='file'
						onChange={handleChange}
					/>
					<label htmlFor='post-input-image'>
						<img
							src={image || EMPTY_IMAGE}
							alt='post'
							className={classes.emptyImage}
						/>
					</label>
					{loading ? (
						<Loader />
					) : (
						<Button
							variant='contained'
							onClick={handleClick}
							className={classes.createBtn}>
							Создать пост
						</Button>
					)}
				</Box>
			</Container>
		</Box>
	);
};
