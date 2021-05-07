import { Box, Container, makeStyles } from '@material-ui/core';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationPanel } from '../components/navigation/NavigationPanel';
import { ChangeAvatar } from '../components/updateProfile/ChangeAvatar';
import { ChangePasswordArea } from '../components/updateProfile/ChangePasswordArea';
import { ChooseGender } from '../components/updateProfile/ChooseGender';
import { GeneralUserInfo } from '../components/updateProfile/GeneralUserInfo';
import { SaveGeneralInfoBtn } from '../components/updateProfile/SaveGeneralInfoBtn';
import {
	ALERT_ERROR,
	ALERT_WARNING,
	DEFAULT_USER_AVATAR,
} from '../constants/constants';
import { showAlert } from '../store/alert/alertActions';
import { selectUser } from '../store/selectors';
import {
	changePassword,
	updateAvatar,
	updateProfile,
} from '../store/user/userActions';

const useStyles = makeStyles({
	container: {
		paddingTop: '1rem',
	},
});

export const UpdateProfile = () => {
	const classes = useStyles();
	const user = useSelector(selectUser);
	const dispatch = useDispatch();

	const userPhone = user.phone?.split('').splice(-10, 10).join('');

	const [name, setName] = useState<string>(user.name);
	const [email, setEmail] = useState<any>(user.email);
	const [phone, setPhone] = useState<number | string>(userPhone || '');
	const [photoUrl, setPhotoUrl] = useState<any>(
		user.photoUrl || DEFAULT_USER_AVATAR
	);
	const [pass, setPass] = useState<string>('');
	const [confirmPass, setConfirmPass] = useState<string>('');
	const [gender, setGender] = useState<string>(user.gender || '');

	const handleChangeUserAvatar = (
		e: React.ChangeEvent<HTMLInputElement> | any
	) => {
		const file = e.target.files?.item(0);
		const reader = new FileReader();

		reader.onload = (e) => {
			const result = e.target?.result;
			setPhotoUrl(result);
		};

		reader.readAsDataURL(file);
	};

	const handleClickChangePassword = () => {
		if (pass === '' || confirmPass === '') {
			return dispatch(showAlert(ALERT_WARNING, 'Есть пустое поле!'));
		}

		if (pass === confirmPass) {
			return dispatch(changePassword(pass));
		}

		return dispatch(showAlert(ALERT_ERROR, 'Пароли не совпадают!'));
	};

	const handleClickSaveChanges = () => {
		const regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

		if (name === '' || email === '') {
			return dispatch(showAlert(ALERT_ERROR, 'Поле имя и емейл обязательные!'));
		}

		if (!regex.test(email)) {
			return dispatch(showAlert(ALERT_ERROR, 'Не валидный емейл'));
		}

		if (
			phone &&
			(phone.toString().length < 9 || phone.toString().length > 10)
		) {
			return dispatch(
				showAlert(ALERT_ERROR, 'Введите корректный номер телефона')
			);
		}

		const payload = {
			email,
			name,
			phone: phone.toString(),
			gender,
		};

		dispatch(updateProfile(payload));
	};

	const handleChangeGender = (event: React.ChangeEvent<HTMLInputElement>) => {
		setGender((event.target as HTMLInputElement).value);
	};

	const handleClickSaveAvatar = () => {
		dispatch(updateAvatar(photoUrl, name));
	};

	const generalUserInfoProps = {
		name,
		setName,
		email,
		setEmail,
		phone,
		setPhone,
	};

	return (
		<Box component='section'>
			<NavigationPanel backButton title='Редактировать профиль' />
			<Container className={classes.container}>
				<ChangeAvatar
					onChange={handleChangeUserAvatar}
					photoUrl={photoUrl}
					name={name}
					onClickSaveAvatar={handleClickSaveAvatar}
				/>
				<GeneralUserInfo {...generalUserInfoProps} />
				<ChooseGender gender={gender} onChangeGender={handleChangeGender} />
				<SaveGeneralInfoBtn onClickSave={handleClickSaveChanges} />
				<ChangePasswordArea
					pass={pass}
					setPass={setPass}
					setConfirmPass={setConfirmPass}
					confirmPass={confirmPass}
					ocClickChangePass={handleClickChangePassword}
				/>
			</Container>
		</Box>
	);
};
