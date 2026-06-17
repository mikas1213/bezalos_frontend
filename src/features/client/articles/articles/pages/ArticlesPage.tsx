import { useEffect } from 'react';

import { Container } from '../../../../../components/Shared';
import { ArticlesGrid, ArticlesHeader, CategoryChips, FeaturedArticle } from '../components';
import { useArticles } from '../hooks';
import { articleCategories } from '../services/articlesService';

const ArticlesPage = () => {
	const { category, setCategory, featured, filtered } = useArticles();

	useEffect(() => {
		document.body.style.backgroundColor = '#fff';
		document.title = 'Be žalos | Straipsniai';
	}, []);

	return (
		<Container>
			<ArticlesHeader />
			<FeaturedArticle article={featured} />
			<CategoryChips categories={articleCategories} active={category} onChange={setCategory} />
			<ArticlesGrid articles={filtered} />
		</Container>
	);
};

export default ArticlesPage;
