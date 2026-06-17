import { useEffect, useState } from 'react';

import { seedComments } from '../../articles/services/articlesService';

export interface ArticleComment {
	id: string;
	name: string;
	date: string;
	text: string;
	likes: number;
	likedByMe: boolean;
	/** True for comments written by the current visitor in this session. */
	mine?: boolean;
}

const todayStr = () => {
	const d = new Date();
	const pad = (n: number) => String(n).padStart(2, '0');
	return `${d.getFullYear()} ${pad(d.getMonth() + 1)} ${pad(d.getDate())}`;
};

const seed = (): ArticleComment[] => seedComments.map((c, i) => ({ ...c, id: `seed-${i}`, likedByMe: false }));

/**
 * Per-article comment thread, persisted in localStorage; falls back to the
 * shared seed comments on first open. The page is remounted per article
 * (keyed by id), so the initializer reads the right thread on navigation.
 */
export const useArticleComments = (articleId: string) => {
	const storageKey = `bz_comments_${articleId}`;
	const [comments, setComments] = useState<ArticleComment[]>(() => {
		try {
			const saved = localStorage.getItem(storageKey);
			if (saved) return JSON.parse(saved) as ArticleComment[];
		} catch {
			/* fall through to seed */
		}
		return seed();
	});

	useEffect(() => {
		try {
			localStorage.setItem(storageKey, JSON.stringify(comments));
		} catch {
			/* storage unavailable — keep in memory only */
		}
	}, [storageKey, comments]);

	const addComment = (name: string, text: string) => {
		const trimmed = text.trim();
		if (!trimmed) return;
		const comment: ArticleComment = {
			id: `c-${Date.now()}`,
			name: name.trim() || 'Anonimė',
			date: todayStr(),
			text: trimmed,
			likes: 0,
			likedByMe: false,
			mine: true,
		};
		setComments((prev) => [comment, ...prev]);
	};

	const toggleLike = (id: string) => {
		setComments((prev) =>
			prev.map((c) => (c.id === id ? { ...c, likedByMe: !c.likedByMe, likes: c.likes + (c.likedByMe ? -1 : 1) } : c)),
		);
	};

	return { comments, addComment, toggleLike };
};
