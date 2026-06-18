import { Link } from 'react-router-dom';

import type { Article } from '../../services/articlesService';

import styles from './FeaturedArticle.module.scss';

interface FeaturedArticleProps {
	article: Article;
}

export const FeaturedArticle = ({ article }: FeaturedArticleProps) => {
	return (
		<Link className={styles.featuredArticle} to={`/straipsniai/${article.slug}`}>
			<div className={styles.featuredArticleMedia}>
				<img src={article.img} alt={article.title} />
			</div>
			<div className={styles.featuredArticleBody}>
				<div className={styles.articleCategory}>{article.cat}</div>
				<h2 className={styles.articleTitle}>{article.title}</h2>
				<p className={styles.articleExcerpt}>{article.excerpt}</p>
				<div className={styles.ArticleMeta}>
					<span>{article.author}</span>
					<span className={styles.articleDot} />
					<span>{article.date}</span>
					<span className={styles.articleDot} />
					<span>{article.readTime} skaitymo</span>
				</div>
				<span className={styles.articleReadmore}>Skaityti straipsnį →</span>
			</div>
		</Link>
	);
};
