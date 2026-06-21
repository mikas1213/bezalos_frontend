import { articles } from './articles';
import type { Article, SeedComment } from './articleTypes';

export { articles } from './articles';
export type { Article, ArticleBodyBlock, SeedComment } from './articleTypes';

/** "Visi" plus the unique categories present across all articles, in order of first appearance. */
export const articleCategories = ['Visi', ...new Set(articles.map((article) => article.cat))];
export const seedComments: SeedComment[] = [
	{
		name: 'Greta',
		date: '2025 05 13',
		text: 'Ačiū už šį tekstą. Pirmą kartą perskaičiau kažką apie valgymą be kaltinimo ir spaudimo. Labai reikėjo.',
		likes: 12,
	},
	{
		name: 'Monika',
		date: '2025 05 13',
		text: 'Tas stabtelėjimas prieš atidarant šaldytuvą man tikrai padeda. Iš pradžių atrodė keista, dabar — natūralu.',
		likes: 7,
	},
	{
		name: 'Rūta',
		date: '2025 05 12',
		text: 'Skaitau ir atpažįstu save. Smagu žinoti, kad nesu viena su tokiais vakarais.',
		likes: 4,
	},
];

/** Look up a single article by its URL slug. */
export const getArticleBySlug = (slug: string | undefined): Article | undefined =>
	slug ? articles.find((article) => article.slug === slug) : undefined;

/** Other articles to surface under "Skaityk toliau". */
export const getRelatedArticles = (id: string, count = 3): Article[] =>
	articles.filter((article) => article.id !== id).slice(0, count);
