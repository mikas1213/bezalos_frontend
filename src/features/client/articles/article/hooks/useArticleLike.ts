import { useEffect, useState } from 'react';

/**
 * Per-article "Patinka" state, persisted in localStorage so a like survives
 * reloads. The page is remounted per article (keyed by id), so reading the
 * stored value in the initializer is enough — no re-sync effect needed.
 */
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
