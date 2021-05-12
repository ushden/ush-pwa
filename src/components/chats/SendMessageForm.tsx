import {
	CardActions,
	IconButton,
	InputAdornment,
	TextField,
	withStyles,
	makeStyles,
} from '@material-ui/core';
import DeadIcon from '@material-ui/icons/SentimentVeryDissatisfiedOutlined';
import FileIcon from '@material-ui/icons/AttachFileOutlined';
import SendIcon from '@material-ui/icons/SendOutlined';
import { ChangeEvent, FC, memo, ReactElement, useCallback } from 'react';
import { COLOR_PRIMARY } from '../../constants/constants';
import classNames from 'classnames';
import { Emoji } from '../Emoji';

const useStyles = makeStyles({
	form: {
		position: 'fixed',
		bottom: 0,
		left: 0,
		right: 0,
		width: '100%',
		backgroundColor: '#fff',
		padding: 0,
		flexDirection: 'column',
	},
	inputWrap: {
		width: '100%',
		margin: 0,
	},
	input: {
		width: '100%',
		height: '100%',
		padding: '0.5rem',
		boxShadow: '0px -3px 17px -8px rgba(0,0,0,0.5)',
	},
	btn: {
		padding: 0,
		color: COLOR_PRIMARY,
	},
	icon: {
		paddingTop: '0.5rem',
		paddingBottom: '0.5rem',
		width: '1.8rem',
		height: '1.8rem',
	},
	sendIcon: {
		marginRight: '0.4rem',
	},
	emojiIcon: {
		marginLeft: '0.3rem',
	},
});

const MessageInput = withStyles({
	root: {
		'& label.Mui-focused': {
			color: 'transparent',
		},
		'& .MuiInput-underline:after': {
			border: 'none',
			display: 'none',
		},
		'& .MuiInput-underline:before': {
			border: 'none',
			display: 'none',
		},
		'& .MuiOutlinedInput-root': {
			'&.Mui-focused fieldset': {
				border: 'none',
			},
		},
	},
})(TextField);

interface MessageLeftProps {
	inputValue: string;
	onChangeMessageInput: (e: ChangeEvent<HTMLInputElement>) => void;
	showIcons: boolean;
	onClickSend: () => void;
	onEmojiClick: (_: any, emojiObject: any) => void;
	onChangeFileInput: (
		e: React.ChangeEvent<HTMLInputElement> | any
	) => Promise<void>;
	visibleEmoji: boolean;
	setVisibleEmoji: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SendMessageForm: FC<MessageLeftProps> = memo(
	(props): ReactElement => {
		const {
			inputValue,
			onChangeMessageInput,
			showIcons,
			onClickSend,
			onChangeFileInput,
			onEmojiClick,
			visibleEmoji,
			setVisibleEmoji,
		} = props;
		const classes = useStyles();

		const renderFileIcon = useCallback(() => {
			return (
				<>
					<input
						type='file'
						id='message-file-pick'
						style={{ display: 'none' }}
						accept='image/*'
						onChange={onChangeFileInput}
					/>
					<IconButton className={classes.btn}>
						<label htmlFor='message-file-pick'>
							<FileIcon className={classNames(classes.icon, 'anim-scale')} />
						</label>
					</IconButton>
				</>
			);
		}, [classes.btn, classes.icon, onChangeFileInput]);

		return (
			<>
				{visibleEmoji && (
					<Emoji onEmojiClickHandle={onEmojiClick} visible={visibleEmoji} />
				)}
				<CardActions className={classes.form}>
					<MessageInput
						className={classes.input}
						value={inputValue}
						onChange={onChangeMessageInput}
						placeholder='Ваше сообщение...'
						multiline
						rowsMax={4}
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									{showIcons ? (
										<IconButton
											className={classes.btn}
											onClick={() => setVisibleEmoji((open) => !open)}>
											<DeadIcon
												className={classNames(
													classes.icon,
													'anim-scale',
													classes.emojiIcon
												)}
											/>
										</IconButton>
									) : (
										renderFileIcon()
									)}
								</InputAdornment>
							),
							endAdornment: (
								<InputAdornment position='end'>
									{showIcons ? (
										<IconButton className={classes.btn} onClick={onClickSend}>
											<SendIcon
												className={classNames(
													classes.icon,
													'anim-scale',
													classes.sendIcon
												)}
											/>
										</IconButton>
									) : (
										<></>
									)}
								</InputAdornment>
							),
						}}
					/>
				</CardActions>
			</>
		);
	}
);
