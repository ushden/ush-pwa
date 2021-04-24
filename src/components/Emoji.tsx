import Picker from 'emoji-picker-react';
import { Box } from '@material-ui/core';

interface EmojiPropsType {
	onEmojiClickHandle: (_: any, emojiObject: any) => void;
	visible: boolean;
}

export const Emoji = ({ onEmojiClickHandle, visible }: EmojiPropsType) => {
	return (
		<Box
			component='div'
			className='anim-opacity'
			style={{ display: visible ? 'block' : 'none', marginBottom: '0.5rem' }}>
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
	);
};
