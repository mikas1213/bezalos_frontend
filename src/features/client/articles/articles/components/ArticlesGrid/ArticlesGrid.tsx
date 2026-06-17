import type { Article } from '../../services/articlesService';
import { ArticleCard } from '../ArticleCard/ArticleCard';

interface ArticlesGridProps {
	articles: Article[];
}

export const ArticlesGrid = ({ articles }: ArticlesGridProps) => {
	if (articles.length === 0) {
		return <p className="bz-art-empty">Šioje kategorijoje straipsnių dar nėra.</p>;
	}

	return (
		<div className="bz-art-grid">
			{articles.map((article) => (
				<ArticleCard key={article.id} article={article} />
			))}
		</div>
	);
};
