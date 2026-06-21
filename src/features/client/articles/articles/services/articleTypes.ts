/** A single block of article prose: paragraph, heading or pull-quote. */
export type ArticleBodyBlock = { t: 'p'; x: string } | { t: 'h'; x: string } | { t: 'q'; x: string };

export interface Article {
	id: string;
	slug: string;
	featured: boolean;
	cat: string;
	title: string;
	excerpt: string;
	img: string;
	author: string;
	date: string;
	readTime: string;
	body: ArticleBodyBlock[];
}

/** Comments used to seed a fresh article discussion. */
export interface SeedComment {
	name: string;
	date: string;
	text: string;
	likes: number;
}
