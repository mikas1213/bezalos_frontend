import { type Recipe, RecipeCard } from '../RecipeCard';

import styles from './RecipesList.module.scss';

interface RecipesListProps {
	isLoading: boolean;
	recipes: Recipe[];
	onToggleLikes: (id: number) => void;
}

export const RecipesList = ({ isLoading, recipes, onToggleLikes }: RecipesListProps) => {
	return (
		<div style={{ minHeight: '50vh' }}>
			<div className={styles.recipes}>
				{!isLoading &&
					recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} onToggleLikes={onToggleLikes} />)}
			</div>
		</div>
	);
};
