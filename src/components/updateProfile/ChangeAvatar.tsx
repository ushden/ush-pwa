import { UserAvatar } from '../usersPage/UserAvatar';
import { Box, Button, Divider, makeStyles } from '@material-ui/core';
import { FC, ReactElement } from 'react';
import { COLOR_PRIMARY } from '../../constants/constants';

const useStyles = makeStyles({
	inputHide: {
		display: 'none',
	},
	divider: {
		marginBottom: '1rem',
	},
	avatarWrap: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: '1rem',
	},
	saveBtn: {
		marginBottom: '1rem',
		color: COLOR_PRIMARY,
		borderColor: COLOR_PRIMARY,

		backgroundColor: 'transparen',
		'&:focus': {
			backgroundColor: 'transpared',
		},
	},
	btnWrap: {
		width: '100%',
		textAlign: 'center',
	},
});

interface ChangeAvatarProps {
	onChange: (e: React.ChangeEvent<HTMLInputElement> | any) => void;
	photoUrl: string | undefined;
	name: string;
	onClickSaveAvatar: () => void;
}

export const ChangeAvatar: FC<ChangeAvatarProps> = ({
	onChange,
	photoUrl,
	name,
	onClickSaveAvatar,
}): ReactElement => {
	const classes = useStyles();

	return (
		<>
			<Box component='div' className={classes.avatarWrap}>
				<input
					accept='image/*'
					className={classes.inputHide}
					id='user-avatar'
					type='file'
					onChange={onChange}
				/>
				<label htmlFor='user-avatar'>
					<UserAvatar src={photoUrl} alt={name} />
				</label>
			</Box>
			<Box className={classes.btnWrap}>
				<Button
					variant='outlined'
					className={classes.saveBtn}
					onClick={onClickSaveAvatar}>
					Изменить аватар
				</Button>
			</Box>
			<Divider className={classes.divider} />
		</>
	);
};
