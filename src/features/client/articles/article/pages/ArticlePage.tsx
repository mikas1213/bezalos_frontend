import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

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

import '../../articles/styles.css';

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
		<div className="bz-article" data-screen-label="Straipsnis">
			<div className="bz-container bz-article-layout">
				<article className="bz-article-inner">
					<ArticleHeader article={article} />
					<ArticleActions article={article} />
					<ArticleProse lead={article.excerpt} body={article.body} />
					<AuthorCard author={article.author} />
					<ArticleComments articleId={article.id} />
				</article>

				<TableOfContents entries={entries} activeId={activeId} onJump={goToSection} />
			</div>

			<RelatedArticles articles={related} />
		</div>
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
