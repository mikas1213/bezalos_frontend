import { useMediaQuery } from '../../../../../../contexts/MediaQueryProvider';
import type { FavoriteRecipe } from '../../hooks/useFavoriteRecipes';
import { Carousel } from '../Carousel';

import styles from './FavoriteRecipes.module.scss';

interface FavoriteRecipesProps {
	mostLiked: FavoriteRecipe[] | undefined;
	isLoading: boolean;
}

export const FavoriteRecipes = ({ mostLiked, isLoading }: FavoriteRecipesProps) => {
	const mediaQuery = useMediaQuery();
	return (
		<>
			{!isLoading && mostLiked && (
				<>
					<div className={styles.header}>Mėgstamiausi</div>
					<Carousel
						mostLiked={mostLiked}
						visibleItems={mediaQuery < 376 ? 1 : mediaQuery < 769 ? 2 : 3}
						rotationInterval={3000}
						pauseDuration={1000}
					/>
				</>
			)}
		</>
	);
};
