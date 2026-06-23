import { useParams } from 'react-router-dom';

import Container from '../../../../../components/UI/Container';
import { NotFoundPage } from '../../../../../pages/notfound/NotFoundPage';
import { RecipeDetails } from '../components/RecipeDetails';
import { useRecipe } from '../hooks/useRecipe';

import RecipeSEO from './RecipeSEO';

import styles from './RecipePage.module.scss';

const RecipePage = () => {
	const { slug } = useParams();
	const { isLoading, recipe } = useRecipe(slug);

	return (
		<>
			{!isLoading && recipe ? <RecipeSEO recipe={recipe} /> : null}
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
		</>
	);
};

export default RecipePage;
