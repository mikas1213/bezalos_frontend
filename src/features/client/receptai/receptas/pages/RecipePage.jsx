import { useParams } from 'react-router-dom';

import Details from '../../components/receptai/receptas/Details';
import Image from '../../components/receptai/receptas/Image';
import Layout from '../../components/receptai/receptas/Layout';
import Container from '../../components/UI/Container';
import Main from '../../components/UI/Main';
import { useRecipe } from '../../hooks/recipes/useRecipe';
import RecipeNotFound from '../notfound/RecipeNotFound';

import RecipeSEO from './RecipeSEO';

const RecipePage = () => {
	const { slug } = useParams();
	const { isLoading, recipe } = useRecipe(slug);

	return (
		<>
			{!isLoading && recipe ? <RecipeSEO recipe={recipe} /> : null}
			<Main>
				<Container>
					{isLoading ? null : recipe ? (
						<Layout>
							<Image recipe={recipe} />
							<Details recipe={recipe} />
						</Layout>
					) : (
						<RecipeNotFound />
					)}
				</Container>
			</Main>
		</>
	);
};

export default RecipePage;
