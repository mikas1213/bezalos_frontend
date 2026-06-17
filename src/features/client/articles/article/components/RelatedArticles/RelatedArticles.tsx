import { Container } from '../../../../../../components/Shared';
import { ArticleCard } from '../../../articles/components';
import type { Article } from '../../../articles/services/articlesService';

import styles from './RelatedArticles.module.scss';
interface RelatedArticlesProps {
	articles: Article[];
}

export const RelatedArticles = ({ articles }: RelatedArticlesProps) => {
	if (articles.length === 0) return null;

	return (
		<Container className={styles.related}>
			<h3 className={styles.relatedTitle}>Skaityk toliau</h3>
			<div className={styles.articleGrid}>
				{articles.map((article) => (
					<ArticleCard key={article.id} article={article} />
				))}
			</div>
		</Container>
	);
};
