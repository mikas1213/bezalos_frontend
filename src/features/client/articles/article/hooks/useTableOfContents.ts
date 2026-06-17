import { useEffect, useMemo, useState } from 'react';

import type { ArticleBodyBlock } from '../../articles/services/articlesService';

export interface TocEntry {
	id: string;
	label: string;
}

/**
 * Builds a table of contents from the heading blocks of an article body and
 * tracks which section is currently in view (scroll-spy). Section ids match
 * the `sec-{index}` ids rendered by ArticleProse.
 */
export const useTableOfContents = (body: ArticleBodyBlock[]) => {
	const entries = useMemo<TocEntry[]>(
		() =>
			body
				.map((block, index) => ({ block, index }))
				.filter(({ block }) => block.t === 'h')
				.map(({ block, index }) => ({ id: `sec-${index}`, label: block.x })),
		[body],
	);

	const [activeId, setActiveId] = useState<string | null>(null);

	useEffect(() => {
		if (entries.length === 0) return;
		const ids = entries.map((entry) => entry.id);

		const onScroll = () => {
			let current = ids[0];
			for (const id of ids) {
				const el = document.getElementById(id);
				if (el && el.getBoundingClientRect().top <= 140) current = id;
			}
			setActiveId(current);
		};

		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, [entries]);

	const goToSection = (id: string) => {
		const el = document.getElementById(id);
		if (!el) return;
		const y = el.getBoundingClientRect().top + window.scrollY - 100;
		window.scrollTo({ top: y, behavior: 'smooth' });
	};

	return { entries, activeId, goToSection };
};
