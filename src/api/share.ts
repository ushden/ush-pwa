interface PropsType {
	title: string;
	text?: string;
	id: string;
}

export const sharePost = async ({ title, text, id }: PropsType) => {
	const data = {
		title,
		text,
		url: `${window.location.href}post/${id}`,
	};

	if (navigator.share) {
		await navigator.share(data);
	}
};
