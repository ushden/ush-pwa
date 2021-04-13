import { storage } from '../firebase';

export const uploadImage = async (
	uri: string,
	name: string | undefined,
	path: string
) => {
	try {
		let url = '';

		const response = await fetch(uri);
		const blob = await response.blob();
		const ref = storage.ref().child(`${path}/${name}`);
		const snapshot = await ref.put(blob);
		await snapshot.ref.getDownloadURL().then((response) => (url = response));

		return url;
	} catch (error) {
		console.error(error.code, error.message);
	}
};
