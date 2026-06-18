import { useEffect, useState } from 'react';

export const useArticleLike = (articleId: string, baseLikes: number) => {
	const storageKey = `bz_like_${articleId}`;
	const [liked, setLiked] = useState(() => {
		try {
			return localStorage.getItem(storageKey) === '1';
		} catch {
			return false;
		}
	});

	useEffect(() => {
		try {
			localStorage.setItem(storageKey, liked ? '1' : '0');
		} catch {
			/* storage unavailable — keep the like in memory only */
		}
	}, [storageKey, liked]);

	const toggle = () => setLiked((prev) => !prev);

	return { liked, likeCount: baseLikes + (liked ? 1 : 0), toggle };
};
