import { type Recipe, RecipeCard } from '../RecipeCard';

import styles from './RecipesList.module.scss';

interface RecipesListProps {
	isPending: boolean;
	isFetchingNextPage: boolean;
	hasNextPage: boolean;
	recipes: Recipe[];
	onLoadMore: () => void;
}

export const RecipesList = ({ isPending, isFetchingNextPage, hasNextPage, recipes, onLoadMore }: RecipesListProps) => {
	return (
		<div style={{ minHeight: '50vh', paddingBottom: '4.8rem' }}>
			<div className={styles.recipes}>
				{!isPending && recipes.map((recipe, index) => <RecipeCard key={recipe.id} recipe={recipe} index={index % 15} />)}
			</div>

			{(hasNextPage || isFetchingNextPage) && (
				<div className={styles.loadMore}>
					{isFetchingNextPage ? (
						<span style={{ color: 'var(--color-text-grey)', fontSize: 'var(--font-16)' }}>Kraunama...</span>
					) : (
						<button type="button" className={styles.loadMoreBtn} onClick={onLoadMore}>
							Rodyti daugiau
						</button>
					)}
				</div>
			)}
		</div>
	);
};
