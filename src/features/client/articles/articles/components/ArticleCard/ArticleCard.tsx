import { Link } from 'react-router-dom';

import type { Article } from '../../services/articlesService';

interface ArticleCardProps {
	article: Article;
}

export const ArticleCard = ({ article }: ArticleCardProps) => {
	return (
		<Link className="bz-art-card" to={`/straipsniai/${article.id}`}>
			<div className="bz-art-card-media">
				<img src={article.img} alt={article.title} loading="lazy" />
				<span className="bz-art-card-cat">{article.cat}</span>
			</div>
			<div className="bz-art-card-body">
				<h3 className="bz-art-card-title">{article.title}</h3>
				<p className="bz-art-card-excerpt">{article.excerpt}</p>
				<div className="bz-art-meta">
					<span>{article.date}</span>
					<span className="bz-art-dot" />
					<span>{article.readTime}</span>
				</div>
			</div>
		</Link>
	);
};
