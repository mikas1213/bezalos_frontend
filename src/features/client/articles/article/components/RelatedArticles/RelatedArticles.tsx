import { ArticleCard } from '../../../articles/components';
import type { Article } from '../../../articles/services/articlesService';

interface RelatedArticlesProps {
	articles: Article[];
}

export const RelatedArticles = ({ articles }: RelatedArticlesProps) => {
	if (articles.length === 0) return null;

	return (
		<section className="bz-container bz-related">
			<h3 className="bz-related-title">Skaityk toliau</h3>
			<div className="bz-art-grid">
				{articles.map((article) => (
					<ArticleCard key={article.id} article={article} />
				))}
			</div>
		</section>
	);
};
