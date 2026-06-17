import { useEffect } from 'react';

import { ArticlesGrid, ArticlesHeader, CategoryChips, FeaturedArticle } from '../components';
import { useArticles } from '../hooks';
import { articleCategories } from '../services/articlesService';

import '../styles.css';

const ArticlesPage = () => {
	const { category, setCategory, featured, filtered } = useArticles();

	useEffect(() => {
		document.body.style.backgroundColor = '#fff';
		document.title = 'Be žalos | Straipsniai';
	}, []);

	return (
		<div className="bz-straipsniai" data-screen-label="Straipsniai">
			<ArticlesHeader />

			<div className="bz-container">
				<FeaturedArticle article={featured} />
				<CategoryChips categories={articleCategories} active={category} onChange={setCategory} />
				<ArticlesGrid articles={filtered} />
			</div>
		</div>
	);
};

export default ArticlesPage;
