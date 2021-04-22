import { useEffect, useState } from 'react';
import { DocData, firestore } from '../firebase';

export const useFirestoreSubscribe = (
	collName: string,
	docName: string | undefined
) => {
	const [data, setData] = useState<DocData>(undefined);

	useEffect(() => {
		const unsubscribe = firestore
			.collection(collName)
			.doc(docName)
			.onSnapshot((doc) => {
				if (doc.exists) {
					const data = doc.data();

					setData(data);
				}
			});

		return () => unsubscribe();
	}, [collName, docName]);

	return data;
};
