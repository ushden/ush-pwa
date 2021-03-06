import {
	Box,
	Button,
	Container,
	makeStyles,
	Typography,
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	SendNotificationParamsToGroup,
	sendNotificationToGroupUsers,
} from '../api/notification';
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
import { selectUsers } from '../store/selectors';
import { PostType } from '../store/types';
import { getUser } from '../store/user/userActions';
import { fetchUsers } from '../store/users/usersActions';

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

	const usersTokens = useSelector(selectUsers)
		.map((user) => user.pushToken)
		.filter((token) => token);

	const user = useSelector((state: RootState) => state.user.user);
	const loading = useSelector((state: RootState) => state.posts.postLoading);

	const [title, setTitle] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [image, setImage] = useState<any>('');

	useEffect(() => {
		if (!user._id) {
			dispatch(getUser());
		}
		dispatch(fetchUsers());
	}, [dispatch, user._id]);

	const handleChange = async (e: React.ChangeEvent<HTMLInputElement> | any) => {
		const file = e.target.files?.item(0);
		const reader = new FileReader();

		reader.onload = (e) => {
			const result = e.target?.result;
			setImage(result);
		};

		reader.readAsDataURL(file);
	};

	const handleClick = async () => {
		if (title === '') {
			return dispatch(showAlert(ALERT_ERROR, '???????????????? ??????????????????'));
		}

		if (image === '' && description === '') {
			return dispatch(
				showAlert(ALERT_ERROR, '???????????????? ?????????????????????? ?????? ????????????????')
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

		try {
			const payload: SendNotificationParamsToGroup = {
				tokens: usersTokens,
				title: '?????????? ????????!',
				body: `???????????????????????? ${user.name} ???????????? ?????????? ???????? ${post.title} , ?????????? ????????????????????!`,
				url: 'https://social-pwa-afa9f.web.app/',
			};

			await sendNotificationToGroupUsers(payload);
		} catch (error) {
			console.error(error.code, error.message);
		}
	};

	return (
		<Box component='section'>
			<NavigationPanel title='?????????????? ????????' backButton={true} />
			<Container component='div' className={classes.container}>
				<Box component='div'>
					<Typography component='h3' className={classes.title}>
						???????????? ?????????? ????????
					</Typography>
					<TextField
						label='??????????????????'
						variant='filled'
						value={title}
						onChange={(e) => setTitle(e.currentTarget.value)}
						className={classes.inputTitle}
					/>
					<TextField
						label='????????????????'
						multiline
						rows={4}
						variant='filled'
						className={classes.inputDesc}
						rowsMax={4}
						value={description}
						onChange={(e) => setDescription(e.currentTarget.value)}
					/>
					<Typography component='p'>???????????? ????????????????</Typography>
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
							?????????????? ????????
						</Button>
					)}
				</Box>
			</Container>
		</Box>
	);
};
