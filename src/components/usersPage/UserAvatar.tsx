import { FC, useState } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

export const UserAvatar: FC<
	React.DetailedHTMLProps<
		React.ImgHTMLAttributes<HTMLImageElement>,
		HTMLImageElement
	>
> = ({ src, alt, onClick, className }) => {
	const [isLoading, setLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	const handleLoad = async () => {
		setLoading(false);
		setIsError(false);
	};

	const handleError = async () => {
		setLoading(false);
		setIsError(true);
	};

	return (
		<>
			{isError && !isLoading && (
				<img
					src='/images/default_avatar.png'
					style={{
						display: 'inline-block',
						width: '10rem',
						height: '10rem',
						borderRadius: '50%',
					}}
					alt={alt || 'Club 48'}
				/>
			)}
			{!isError && isLoading && (
				<Skeleton
					variant='circle'
					style={{
						display: 'inline-block',
						width: '10rem',
						height: '10rem',
					}}
				/>
			)}
			<img
				style={{
					display: isError || isLoading ? 'none' : 'inline-block',
					width: '10rem',
					height: '10rem',
					borderRadius: '50%',
					objectFit: 'cover',
				}}
				alt={alt || 'Club 48'}
				onLoad={handleLoad}
				onError={handleError}
				src={src}
				onClick={onClick}
				className={className}
			/>
		</>
	);
};
