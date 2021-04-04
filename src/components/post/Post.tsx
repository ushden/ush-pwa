import {
	Avatar,
	Box,
	Container,
	Divider,
	IconButton,
	Paper,
	Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ExpandLessOutlinedIcon from '@material-ui/icons/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';

import { COLOR_DARK, COLOR_PRIMARY } from '../../constants/constants';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
	post: {
		padding: '0.5rem 0',
		margin: '0.6rem 0',
	},
	container: {
		paddingLeft: '0.5rem',
		paddingRight: '0.5rem',
	},
	postHeader: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: '0.4rem',
	},
	postInfo: {
		display: 'flex',
		alignItems: 'center',
	},
	postInfoWrap: {
		marginLeft: '0.4rem',
	},
	postInfoAvatar: {
		width: '1.7rem',
		height: '1.7rem',
	},
	postInfoName: {
		fontSize: '0.8rem',
	},
	postInfoData: {
		color: '#ccc',
		fontSize: '0.6rem',
		fontWeight: 'lighter',
	},
	postMenu: {
		display: 'flex',
		justifyContent: 'end',
	},
	postMenuBtn: {
		padding: 0,
		color: COLOR_PRIMARY,
	},
	postMenuIcon: {
		color: COLOR_PRIMARY,
	},
	postBody: {
		marginBottom: '0.7rem',
	},
	postBodyTitle: {
		fontSize: '1.2rem',
		fontWeight: 'bold',
	},
	postBodyTitleLink: {
		textDecoration: 'none',
		color: COLOR_DARK,
	},
	postBodyImg: {
		maxWidth: '100%',
		objectFit: 'contain',
	},
	postFooter: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginTop: '0.7rem',
	},
	postFooterAppraisal: {
		display: 'flex',
		alignItems: 'center',
	},
	postFooterAppraisalBtn: {
		width: '1.5rem',
		height: '1.5rem',
		borderRadius: '0.2rem',
	},
	postFooterAppraisalCount: {
		marginLeft: '0.8rem',
		marginRight: '0.8rem',
	},
	postAppraisalCounBtnPress: {
		color: COLOR_PRIMARY,
	},
	postFooterComents: {
		display: 'flex',
		alignItems: 'center',
	},
	postFooterBtn: {
		color: COLOR_PRIMARY,
	},
});

export const Post = () => {
	const classes = useStyles();

	return (
		<Paper component='article' elevation={3} className={classes.post}>
			<Container component='div' className={classes.container}>
				<Box component='div' className={classes.postHeader}>
					<Box className={classes.postInfo} component='div'>
						<Avatar className={classes.postInfoAvatar} alt='userName' />
						<Box component='div' className={classes.postInfoWrap}>
							<Typography component='h4' className={classes.postInfoName}>
								User Name
							</Typography>
							<Typography component='p' className={classes.postInfoData}>
								{new Date().toLocaleString()}
							</Typography>
						</Box>
					</Box>
					<Box className={classes.postMenu} component='div'>
						<IconButton className={classes.postMenuBtn} aria-label='menu'>
							<MoreVertIcon className={classes.postMenuIcon} />
						</IconButton>
					</Box>
				</Box>
				<Box component='div' className={classes.postBody}>
					<Typography component='h3' className={classes.postBodyTitle}>
						<Link
							to={{ pathname: `/post/id`, state: { title: 'Post name' } }}
							className={classes.postBodyTitleLink}>
							Что такое Lorem Ipsum?
						</Link>
					</Typography>
					<img
						src={
							'https://cs13.pikabu.ru/post_img/big/2021/04/04/7/1617533181138124881.png'
						}
						alt='post name'
						className={classes.postBodyImg}
					/>
					<Typography component='p'>
						Lorem Ipsum - это текст-"рыба", часто используемый в печати и
						вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на
						латинице с начала XVI века. В то время некий безымянный печатник
						создал большую коллекцию размеров и форм шрифтов, используя Lorem
						Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил
						без заметных изменений пять веков, но и перешагнул в электронный
						дизайн. Его популяризации в новое время послужили публикация листов
						Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее
						время, программы электронной вёрстки типа Aldus PageMaker, в
						шаблонах которых используется Lorem Ipsum.
					</Typography>
				</Box>
				<Divider />
				<Box component='div' className={classes.postFooter}>
					<Box component='div' className={classes.postFooterAppraisal}>
						<IconButton className={classes.postFooterAppraisalBtn}>
							<ExpandLessOutlinedIcon />
						</IconButton>
						<Typography
							component='p'
							className={classes.postFooterAppraisalCount}>
							0
						</Typography>
						<IconButton className={classes.postFooterAppraisalBtn}>
							<ExpandMoreOutlinedIcon />
						</IconButton>
					</Box>
					<Box component='div' className={classes.postFooterComents}>
						<IconButton className={classes.postFooterBtn}>
							<CommentOutlinedIcon />
						</IconButton>
						<Typography component='p'>0</Typography>
					</Box>
					<Box component='div'>
						<IconButton className={classes.postFooterBtn}>
							<BookmarkBorderOutlinedIcon />
						</IconButton>
					</Box>
					<Box component='div'>
						<IconButton className={classes.postFooterBtn}>
							<ShareOutlinedIcon />
						</IconButton>
					</Box>
				</Box>
			</Container>
		</Paper>
	);
};
