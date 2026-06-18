import { Link } from 'react-router-dom';

import type { Article } from '../../services/articlesService';

import styles from './ArticleCard.module.scss';

interface ArticleCardProps {
	article: Article;
}

export const ArticleCard = ({ article }: ArticleCardProps) => {
	return (
		<Link className={styles.articleCard} to={`/straipsniai/${article.slug}`}>
			<div className={styles.articleCardMedia}>
				<img src={article.img} alt={article.title} loading="lazy" />
				<span className={styles.articleCardCat}>{article.cat}</span>
			</div>
			<div className={styles.articleCardBody}>
				<h3 className={styles.articleCardTitle}>{article.title}</h3>
				<p className={styles.articleCardExcerpt}>{article.excerpt}</p>
				<div className={styles.articleMeta}>
					<span>{article.date}</span>
					<span className={styles.articleDot} />
					<span>{article.readTime}</span>
				</div>
			</div>
		</Link>
	);
};
