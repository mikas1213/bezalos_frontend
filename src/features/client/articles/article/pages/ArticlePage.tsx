import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Container } from '../../../../../components/Shared';
import { NotFoundPage } from '../../../../../pages/notfound/NotFoundPage';
import { type Article, getArticleById, getRelatedArticles } from '../../articles/services/articlesService';
import {
	ArticleActions,
	ArticleComments,
	ArticleHeader,
	ArticleProse,
	AuthorCard,
	RelatedArticles,
	TableOfContents,
} from '../components';
import { useTableOfContents } from '../hooks';

import styles from './ArticlePage.module.scss';
interface ArticleViewProps {
	article: Article;
}

const ArticleView = ({ article }: ArticleViewProps) => {
	const { entries, activeId, goToSection } = useTableOfContents(article.body);

	useEffect(() => {
		document.body.style.backgroundColor = '#fff';
		document.title = `Be žalos | ${article.title}`;
	}, [article.title]);

	const related = getRelatedArticles(article.id);

	return (
		<Container className={styles.articleLayout}>
			<article className={styles.articleInner}>
				<ArticleHeader article={article} />
				<ArticleActions article={article} />
				<ArticleProse lead={article.excerpt} body={article.body} />
				<AuthorCard author={article.author} />
				<ArticleComments articleId={article.id} />
			</article>

			<TableOfContents entries={entries} activeId={activeId} onJump={goToSection} />
			<RelatedArticles articles={related} />
		</Container>
	);
};

const ArticlePage = () => {
	const { slug } = useParams();
	const article = getArticleById(slug);

	if (!article) return <NotFoundPage />;

	// Key by id so per-article like/comment state re-initialises on navigation.
	return <ArticleView key={article.id} article={article} />;
};

export default ArticlePage;
