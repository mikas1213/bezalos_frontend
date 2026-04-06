import type { CommentDto } from '../../../service/commentsService';
export type ColorPair = {
	bg: string;
	cl: string;
};

const COLOR_PAIRS: ColorPair[] = [
	{ bg: '#e1f5ee', cl: '#0f6e56' },
	{ bg: '#faeeda', cl: '#854f0b' },
	{ bg: '#e6f1fb', cl: '#185fa5' },
	{ bg: '#fcebeb', cl: '#a32d2d' },
	{ bg: '#eaf3de', cl: '#3b6d11' },
	{ bg: '#e0f7f9', cl: '#0b6b78' },
	{ bg: '#eef2f5', cl: '#3a4a5c' },
	{ bg: '#f3f0e3', cl: '#6d5a1a' },
	{ bg: '#fdf1c7', cl: '#a06a00' },
];
export const getInitials = (name: string) => {
	return name
		.split(' ')
		.map((w) => w[0])
		.join('')
		.slice(0, 2)
		.toUpperCase();
};

export const hashString = (str: string) => {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		hash = str.charCodeAt(i) + ((hash << 5) - hash);
	}
	return Math.abs(hash);
};

export const getUserColor = (name: string = 'unknown'): ColorPair => {
	const hash = hashString(name);
	return COLOR_PAIRS[hash % COLOR_PAIRS.length];
};

export const formatTime = (createdAt: string) => {
	const diff = Date.now() - new Date(createdAt).getTime();
	const minutes = Math.floor(diff / 60000);
	if (minutes < 1) return 'ką tik';
	if (minutes < 60) return `prieš ${minutes} min.`;
	const hours = Math.floor(minutes / 60);
	if (hours < 24) return `prieš ${hours} val.`;
	const days = Math.floor(hours / 24);
	if (days < 7) return `prieš ${days} d.`;
	const weeks = Math.floor(days / 7);
	if (weeks < 4) return `prieš ${weeks} sav.`;
	const months = Math.floor(days / 30);
	if (months < 12) return `prieš ${months} mėn.`;
	const years = Math.floor(days / 365);
	return `prieš ${years} m.`;
};

export const getCommentsCount = (comments: CommentDto[]): number => {
	return comments.reduce((total, comment) => {
		const repliesCount = comment.replies?.length || 0;
		return total + 1 + repliesCount;
	}, 0);
};
