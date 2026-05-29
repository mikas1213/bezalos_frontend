import { useParams } from 'react-router-dom';

import Container from '../../../../../components/UI/Container';
import Main from '../../../../../components/UI/Main';
import { NotFoundPage } from '../../../../../pages/notfound/NotFoundPage';
import { RecipeDetails } from '../components/RecipeDetails';
import { useRecipe } from '../hooks/useRecipe';

import RecipeSEO from './RecipeSEO';

import styles from './RecipePage.module.scss';

const RecipePage = () => {
	const { slug } = useParams();
	const { isLoading, recipe } = useRecipe(slug);
	if (!isLoading) {
		console.log(recipe);
	}
	return (
		<>
			{!isLoading && recipe ? <RecipeSEO recipe={recipe} /> : null}
			<Main>
				<Container>
					{isLoading ? null : recipe ? (
						<div className={styles.layout}>
							<div className={styles.image}>
								<img src={recipe.image_l} alt={recipe.title} />
							</div>
							<RecipeDetails recipe={recipe} />
						</div>
					) : (
						<NotFoundPage />
					)}
				</Container>
			</Main>
		</>
	);
};

export default RecipePage;
