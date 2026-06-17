import { Link } from 'react-router-dom';

import { ArrowLeft } from 'lucide-react';

import type { Article } from '../../../articles/services/articlesService';
import { initials } from '../../utils/initials';

import styles from './ArticleHeader.module.scss';

interface ArticleHeaderProps {
	article: Article;
}

export const ArticleHeader = ({ article }: ArticleHeaderProps) => {
	return (
		<>
			<Link className={styles.articleBack} to="/straipsniai">
				<ArrowLeft size={18} />
				<span>Visi straipsniai</span>
			</Link>

			<header className={styles.articleHead}>
				<div className={styles.articleCategory}>{article.cat}</div>
				<h1 className={styles.articleTitle}>{article.title}</h1>
				<div className={styles.articleByline}>
					<div className={styles.avatar}>{initials(article.author)}</div>
					<div className={styles.bylineMeta}>
						<span className={styles.bylineName}>{article.author}</span>
						<span className={styles.bylineSub}>
							{article.date} · {article.readTime} skaitymo
						</span>
					</div>
				</div>
			</header>

			<div className={styles.articleCover}>
				<img src={article.img} alt={article.title} />
			</div>
		</>
	);
};
