import { Link } from 'react-router-dom';

import { Clock, Heart } from 'lucide-react';

import { useToggleLike } from '../../../../../../hooks/useToggleLike';
import { useAuth } from '../../../../../auth';
import { useAuthModal } from '../../../../../auth/modal/hooks/useAuthModal';

import styles from './RecipeCard.module.scss';

export interface Recipe {
	id: number;
	slug: string;
	title: string;
	image_m: string;
	duration: number;
	food_logic: string;
	likes: number;
	liked: boolean;
}

interface RecipeCardProps {
	recipe: Recipe;
	index?: number;
}

export const RecipeCard = ({ recipe, index = 0 }: RecipeCardProps) => {
	const { user } = useAuth();
	const { authOpenModal } = useAuthModal();

	const { mutate: toggleLike } = useToggleLike(String(recipe.id), 'recipes', ['recipe', recipe.id]);

	const handleToggleLike = () => {
		if (!user?.user_id) {
			authOpenModal('auth');
		} else {
			toggleLike();
		}
	};

	return (
		<div className={styles.recipe} style={{ animationDelay: `${index * 60}ms` }}>
			<div className={styles.imageContainer}>
				<Link to={`/receptai/${recipe.slug}`}>
					<img className={styles.image} src={recipe.image_m} alt={`image_${recipe.title}`} />
				</Link>
			</div>

			<div className={styles.title}>
				<Link to={`/receptai/${recipe.slug}`} className={styles.anchor}>
					{recipe.title}
				</Link>
			</div>
			<div className={styles.details}>
				<span className={styles.item}>
					<Clock className={styles.icon} />
					<span className={styles.min}>
						<span>{recipe.duration}</span>
						<small>min.</small>
					</span>
				</span>
				<span className={styles.item}>{recipe.food_logic}</span>
				<span className={`${styles.item} ${styles.likes}`} onClick={handleToggleLike}>
					<Heart className={`${styles.icon} ${recipe.liked ? styles.liked : ''}`} />
					{recipe.likes}
				</span>
			</div>
		</div>
	);
};
