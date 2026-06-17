import { useMemo, useState } from 'react';

import { type Article, articles as allArticles } from '../services/articlesService';

/**
 * Drives the Straipsniai index: the always-on featured article, the active
 * category chip and the filtered grid (everything except the featured one).
 * "Visi" shows all; any other category narrows the grid to that category.
 */
export const useArticles = () => {
	const [category, setCategory] = useState('Visi');

	const featured = useMemo<Article>(() => allArticles.find((a) => a.featured) ?? allArticles[0], []);

	const filtered = useMemo<Article[]>(() => {
		const rest = allArticles.filter((a) => a.id !== featured.id);
		return category === 'Visi' ? rest : rest.filter((a) => a.cat === category);
	}, [category, featured.id]);

	return { category, setCategory, featured, filtered };
};
