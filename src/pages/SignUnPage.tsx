/* eslint-disable @typescript-eslint/no-unused-vars */
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { StepOneContent } from '../components/signUpPage/StepOneContent';
import { StepTwoContent } from '../components/signUpPage/StepTwoContent';
import { StepThreeContent } from '../components/signUpPage/StepThreeContent';
import { makeStyles } from '@material-ui/styles';
import { useState } from 'react';
import { Box, Container } from '@material-ui/core';
import {
	ALERT_ERROR,
	COLOR_EXTRA_LIGHT,
	EMAIL_VALID_ERROR,
	NAME_VALID_ERROR,
	PASS_VALID_ERROR,
} from '../constants/constants';
import { useDispatch, useSelector } from 'react-redux';
import { showAlert } from '../store/alert/alertActions';
import { useHistory } from 'react-router';
import classesName from 'classnames';
import { signUpUserWithEmailAndPassword } from '../store/user/userActions';

const useStyles = makeStyles({
	section: {
		backgroundColor: COLOR_EXTRA_LIGHT,
		width: '100vw',
		height: '100vh',
		overflow: 'hidden',
	},
	container: {
		display: 'flex',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export const SignUnPage = () => {
	const [activeStep, setActiveStep] = useState(0);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [avatar, setAvatar] = useState('');

	const dispatch = useDispatch();
	const classes = useStyles();
	const history = useHistory();

	const handleClickSignUp = () => {
		const payload = {
			email,
			password,
			name,
			avatar,
		};

		dispatch(signUpUserWithEmailAndPassword(payload));
	};

	const getStepContent = (step: number) => {
		switch (step) {
			case 0:
				return (
					<StepOneContent
						email={email}
						setEmail={setEmail}
						pass={password}
						setPass={setPassword}
					/>
				);
			case 1:
				return <StepTwoContent name={name} setName={setName} />;
			case 2:
				return (
					<StepThreeContent
						avatar={avatar}
						setAvatar={setAvatar}
						handleClick={handleClickSignUp}
					/>
				);
			default:
				return;
		}
	};

	const handleClickNext = () => {
		// if (email === '') {
		// 	return dispatch(showAlert(ALERT_ERROR, EMAIL_VALID_ERROR));
		// }

		// if (pass === '' || pass.length < 6) {
		// 	return dispatch(showAlert(ALERT_ERROR, PASS_VALID_ERROR));
		// }

		// if (name === '' && activeStep === 1) {
		// 	return dispatch(showAlert(ALERT_ERROR, NAME_VALID_ERROR));
		// }

		setActiveStep((step) => step + 1);
	};

	const handleClickBack = () => {
		if (activeStep === 0) {
			history.goBack();
		}

		setActiveStep((step) => step - 1);
	};

	return (
		<Box component='section' className={classes.section}>
			<Container className={classes.container}>
				<Box component='div'>{getStepContent(activeStep)}</Box>
			</Container>
			<MobileStepper
				variant='progress'
				steps={3}
				position='bottom'
				activeStep={activeStep}
				nextButton={
					<Button
						size='small'
						onClick={handleClickNext}
						disabled={activeStep === 2}>
						Дальше
						{<KeyboardArrowRight />}
					</Button>
				}
				backButton={
					<Button size='small' onClick={handleClickBack}>
						{<KeyboardArrowLeft />}
						Назад
					</Button>
				}
			/>
		</Box>
	);
};
