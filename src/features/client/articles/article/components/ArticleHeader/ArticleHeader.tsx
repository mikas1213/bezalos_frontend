import { Link } from 'react-router-dom';

import { ArrowLeft } from 'lucide-react';

import type { Article } from '../../../articles/services/articlesService';
import { initials } from '../../utils/initials';

interface ArticleHeaderProps {
	article: Article;
}

export const ArticleHeader = ({ article }: ArticleHeaderProps) => {
	return (
		<>
			<Link className="bz-article-back" to="/straipsniai">
				<ArrowLeft size={18} />
				<span>Visi straipsniai</span>
			</Link>

			<header className="bz-article-head">
				<div className="bz-art-cat">{article.cat}</div>
				<h1 className="bz-article-title">{article.title}</h1>
				<div className="bz-article-byline">
					<div className="bz-avatar">{initials(article.author)}</div>
					<div className="bz-byline-meta">
						<span className="bz-byline-name">{article.author}</span>
						<span className="bz-byline-sub">
							{article.date} · {article.readTime} skaitymo
						</span>
					</div>
				</div>
			</header>

			<div className="bz-article-cover">
				<img src={article.img} alt={article.title} />
			</div>
		</>
	);
};
