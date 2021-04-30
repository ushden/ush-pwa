import { Box, Typography } from '@material-ui/core';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationPanel } from '../components/navigation/NavigationPanel';
import { Post } from '../components/post/Post';
import { fetchPosts } from '../store/posts/postsActions';
import { selectPosts, selectUser } from '../store/selectors';
import { getUser } from '../store/user/userActions';

export const SubscribesPosts = () => {
	const dispatch = useDispatch();

	const user = useSelector(selectUser);
	const posts = useSelector(selectPosts).filter((p) =>
		user.subscribeOn?.includes(p.user._id)
	);

	useEffect(() => {
		if (!user._id) {
			dispatch(getUser());
		}

		if (posts.length === 0) {
			dispatch(fetchPosts());
		}
	}, [dispatch, posts.length, user._id]);

	return (
		<Box component='section'>
			<NavigationPanel title='Лента подписок' />
			<Box>
				{posts.length === 0 ? (
					<Typography
						component='p'
						style={{
							color: '#ccc',
							textAlign: 'center',
							paddingBottom: '1rem',
							paddingTop: '1rem',
						}}>
						Вы не подписаны на пользователей или еще никто не создал пост
					</Typography>
				) : (
					posts.map((p) => <Post key={p._id} post={p} id={p._id} />)
				)}
			</Box>
		</Box>
	);
};
