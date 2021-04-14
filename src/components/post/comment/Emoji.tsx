import Picker from 'emoji-picker-react';
import { IconButton, Box } from '@material-ui/core';
import EmojiEmotionsOutlinedIcon from '@material-ui/icons/EmojiEmotionsOutlined';

import { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { COLOR_PRIMARY } from '../../../constants/constants';

interface EmojiPropsType {
	onEmojiClickHandle: any;
}

const useStyles = makeStyles({
	emojiPiker: {
		padding: '0.5rem',
		marginLeft: '1rem',
		marginBottom: '0.4rem',
		color: COLOR_PRIMARY,
	},
	emojiPikerIcon: {
		fontSize: '2rem',
		color: COLOR_PRIMARY,
	},
});

export const Emoji = ({ onEmojiClickHandle }: EmojiPropsType) => {
	const classes = useStyles();

	const [open, setOpen] = useState(false);

	return (
		<Fragment>
			<IconButton
				className={classes.emojiPiker}
				onClick={() => setOpen((open) => !open)}>
				<EmojiEmotionsOutlinedIcon className={classes.emojiPikerIcon} />
			</IconButton>
			<Box
				component='div'
				className='anim-opacity'
				style={{ display: open ? 'block' : 'none' }}>
				<Picker
					onEmojiClick={onEmojiClickHandle}
					groupNames={{
						smileys_people: 'Смайлы',
						animals_nature: 'Животинки',
						food_drink: 'Еда',
						travel_places: 'Путешествия',
						activities: 'Ю вона плей?',
						objects: 'Стафф',
						symbols: 'Больше фигни',
						flags: 'Куда без флагов',
						recently_used: 'Недавно использовал',
					}}
					pickerStyle={{ width: '100%' }}
				/>
			</Box>
		</Fragment>
	);
};
