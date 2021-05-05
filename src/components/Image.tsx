import { FC, useState } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

export const Image: FC<
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
			{isError && !isLoading && <div>*Заглушка для ошибки*</div>}
			{!isError && isLoading && (
				<Skeleton
					variant='rect'
					style={{
						margin: '0 auto',
						width: '100%',
						height: '18rem',
						maxWidth: '100%',
						objectFit: 'contain',
					}}
				/>
			)}
			<img
				style={{
					display: isError || isLoading ? 'none' : 'initial',
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
