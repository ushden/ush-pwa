import { FC, useState } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

export const ImageAvatar: FC<
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
						borderRadius: '50%',
						width: '2.8rem',
						height: '2.8rem',
					}}
					alt={alt || 'Club 48'}
				/>
			)}
			{!isError && isLoading && (
				<Skeleton
					variant='circle'
					style={{
						width: '2.8rem',
						height: '2.8rem',
					}}
				/>
			)}
			<img
				style={{
					display: isError || isLoading ? 'none' : 'initial',
					borderRadius: '50%',
					width: '2.8rem',
					height: '2.8rem',
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
