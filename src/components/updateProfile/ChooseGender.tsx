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

	return (
		<>
			<FormControl component='fieldset'>
				<FormLabel component='legend'>Ваш пол</FormLabel>
				<RadioGroup
					aria-label='gender'
					name='gender1'
					value={gender}
					onChange={onChangeGender}>
					<FormControlLabel
						value='Женщина'
						control={<Radio />}
						label='Женщина'
					/>
					<FormControlLabel
						value='Мужчина'
						control={<Radio />}
						label='Мужчина'
					/>
					<FormControlLabel
						value='Боевой вертолёт 3000'
						control={<Radio />}
						label='Боевой вертолёт 3000'
					/>
				</RadioGroup>
			</FormControl>
			<Divider className={classes.divider} />
		</>
	);
};
