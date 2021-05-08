import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { FC, ReactElement } from 'react';
import { Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
	divider: { marginBottom: '1rem' },
});

interface ChooseGenderProps {
	gender: string;
	onChangeGender: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ChooseGender: FC<ChooseGenderProps> = ({
	gender,
	onChangeGender,
}): ReactElement => {
	const classes = useStyles();

	const gendersList: Array<string> = [
		'Женщина',
		'Мужчина',
		'Боевой вертолёт 3000',
		'Бэтмен',
		'Назик',
	];

	return (
		<>
			<FormControl component='fieldset'>
				<FormLabel component='legend'>Ваш пол</FormLabel>
				<RadioGroup
					aria-label='gender'
					name='gender1'
					value={gender}
					onChange={onChangeGender}>
					{gendersList.map((gender) => {
						return (
							<FormControlLabel
								value={gender}
								control={<Radio />}
								label={gender}
							/>
						);
					})}
				</RadioGroup>
			</FormControl>
			<Divider className={classes.divider} />
		</>
	);
};
