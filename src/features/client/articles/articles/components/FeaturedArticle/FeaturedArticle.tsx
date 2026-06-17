import { Link } from 'react-router-dom';

import type { Article } from '../../services/articlesService';

interface FeaturedArticleProps {
	article: Article;
}

export const FeaturedArticle = ({ article }: FeaturedArticleProps) => {
	return (
		<Link className="bz-art-featured" to={`/straipsniai/${article.id}`}>
			<div className="bz-art-featured-media">
				<img src={article.img} alt={article.title} />
			</div>
			<div className="bz-art-featured-body">
				<div className="bz-art-cat">{article.cat}</div>
				<h2 className="bz-art-featured-title">{article.title}</h2>
				<p className="bz-art-featured-excerpt">{article.excerpt}</p>
				<div className="bz-art-meta">
					<span>{article.author}</span>
					<span className="bz-art-dot" />
					<span>{article.date}</span>
					<span className="bz-art-dot" />
					<span>{article.readTime} skaitymo</span>
				</div>
				<span className="bz-art-readmore">Skaityti straipsnį →</span>
			</div>
		</Link>
	);
};
