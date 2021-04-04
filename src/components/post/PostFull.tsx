import { Fragment } from 'react';
import { useLocation, useParams } from 'react-router';
import { NavigationPanel } from '../navigation/NavigationPanel';
import { Post } from './Post';

export const PostFull = () => {
	const params = useParams();
	const location = useLocation();

	console.log(params);
	console.log(location);

	return (
		<Fragment>
			<NavigationPanel title='poka tak' backButton={true} />
			<Post />
		</Fragment>
	);
};
