import type { Article } from '../articleTypes';

/** Eagerly pull in the default export of every article file in this folder (index.ts excluded). */
const modules = import.meta.glob<{ default: Article }>(['./*.ts', '!./index.ts'], { eager: true });

/**
 * Every article, auto-collected. Drop a new `*.ts` file in this folder with a
 * `export default { ... } satisfies Article` and it shows up here — no manual list.
 * Drafts without a slug are skipped so placeholder files don't break the page.
 */
export const articles: Article[] = Object.values(modules)
	.map((module) => module.default)
	.filter((article) => article.slug);
