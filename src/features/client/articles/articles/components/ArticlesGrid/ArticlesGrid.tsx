import type { Article } from '../../services/articlesService';
import { ArticleCard } from '../ArticleCard/ArticleCard';

import styles from './ArticlesGrid.module.scss';

interface ArticlesGridProps {
	articles: Article[];
}

export const ArticlesGrid = ({ articles }: ArticlesGridProps) => {
	if (articles.length === 0) {
		return <p className={styles.articleEmpty}>Šioje kategorijoje straipsnių dar nėra.</p>;
	}

	return (
		<div className={styles.articleGrid}>
			{articles.map((article) => (
				<ArticleCard key={article.id} article={article} />
			))}
		</div>
	);
};
