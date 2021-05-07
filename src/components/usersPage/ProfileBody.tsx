import {
	Divider,
	List,
	ListItem,
	makeStyles,
	Paper,
	Typography,
} from '@material-ui/core';
import PostAddOutlinedIcon from '@material-ui/icons/PostAddOutlined';
import StarsOutlinedIcon from '@material-ui/icons/StarsOutlined';
import SupervisorAccountOutlinedIcon from '@material-ui/icons/SupervisorAccountOutlined';
import EmojiPeopleOutlinedIcon from '@material-ui/icons/EmojiPeopleOutlined';

import { COLOR_PRIMARY } from '../../constants/constants';
import { PostType } from '../../store/types';
import { FC, ReactElement } from 'react';

const useStyles = makeStyles({
	listItem: {
		justifyContent: 'space-between',
		padding: '1rem',
	},
	listItemTitle: {
		textTransform: 'uppercase',
		fontSize: '1rem',
		fontWeight: 'unset',
		display: 'flex',
		alignItems: 'center',
	},
	listItemIcon: {
		marginRight: '0.2rem',
		color: COLOR_PRIMARY,
	},
});

interface ProfileBodyProps {
	posts: Array<PostType>;
	rating: number | undefined;
	subscribs: number | undefined;
	followers: number | undefined;
	onSubsribersClick: () => void;
	onFollowersClick: () => void;
}

export const ProfileBody: FC<ProfileBodyProps> = ({
	posts,
	rating,
	subscribs,
	followers,
	onSubsribersClick,
	onFollowersClick,
}): ReactElement => {
	const classes = useStyles();

	return (
		<Paper variant='elevation' elevation={3}>
			<List>
				<ListItem className={classes.listItem} button>
					<Typography component='p' className={classes.listItemTitle}>
						<PostAddOutlinedIcon className={classes.listItemIcon} />
						Посты
					</Typography>
					<Typography component='span'>{posts.length}</Typography>
				</ListItem>
				<Divider />
				<ListItem className={classes.listItem} button>
					<Typography component='p' className={classes.listItemTitle}>
						<StarsOutlinedIcon className={classes.listItemIcon} />
						Рейтинг
					</Typography>
					<Typography component='span'>
						{rating ? Math.floor(rating * 0.48) : 0}
					</Typography>
				</ListItem>
				<Divider />
				<ListItem
					className={classes.listItem}
					button
					onClick={onFollowersClick}>
					<Typography component='p' className={classes.listItemTitle}>
						<EmojiPeopleOutlinedIcon className={classes.listItemIcon} />
						Подписчиков
					</Typography>
					<Typography component='span'>{followers || 0}</Typography>
				</ListItem>
				<Divider />
				<ListItem
					className={classes.listItem}
					button
					onClick={onSubsribersClick}>
					<Typography component='p' className={classes.listItemTitle}>
						<SupervisorAccountOutlinedIcon className={classes.listItemIcon} />
						Подписок
					</Typography>
					<Typography component='span'>{subscribs || 0}</Typography>
				</ListItem>
				<Divider />
			</List>
		</Paper>
	);
};
