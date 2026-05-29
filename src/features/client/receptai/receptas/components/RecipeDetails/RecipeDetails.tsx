import { useState } from 'react';
import { BiBowlRice } from 'react-icons/bi';
import { Link } from 'react-router-dom';

import { CirclePlay, Clock, Flame } from 'lucide-react';

import { type Recipe } from '../../hooks/useRecipe';

import styles from './RecipeDetails.module.scss';

interface RecipeDetailsProps {
	recipe: Recipe;
}

export const RecipeDetails = ({ recipe }: RecipeDetailsProps) => {
	const [poritonIndex, setPortionIndex] = useState(0);

	return (
		<div className={styles.details}>
			<h1 className={styles.title}>{recipe.title}</h1>

			<div className={styles.properties}>
				<div className={styles.time}>
					<Clock className={styles.icon} />
					<span>
						{recipe.duration}
						<small>min.</small>
					</span>
				</div>

				<div className={styles.slider}>
					<div className={styles.number}>
						<BiBowlRice className={styles.iconMeal} />
					</div>
					{[0, 1, 2, 3].map((val) => (
						<div
							key={val}
							className={`${styles.number} ${val === poritonIndex ? styles.active : ''}`}
							onClick={() => setPortionIndex(val)}
						>
							{val + 1}x
						</div>
					))}
					<div className={styles.portionIndex} style={{ left: `calc(2.85rem + ${20 * poritonIndex}%)` }}></div>
				</div>
			</div>

			<div className={styles.image}>
				<img src={recipe.image_l} alt={recipe.title} />
			</div>

			<div className={styles.products}>
				{recipe.products.map((prod) => (
					<div key={prod.id} className={styles.prod}>
						<span>{prod.title}</span>
						<div className={styles.grams}>
							<span>
								{prod.grams * (poritonIndex + 1)}
								<small>g</small>
							</span>
						</div>
					</div>
				))}
			</div>

			<div className={styles.bar}>
				<div className={`${styles.barItem} ${styles.b}`}>
					<span>B</span>
					<span>
						{recipe.b * (poritonIndex + 1)}
						<small>g</small>
					</span>
				</div>
				<div className={`${styles.barItem} ${styles.a}`}>
					<span>A</span>
					<span>
						{recipe.a * (poritonIndex + 1)}
						<small>g</small>
					</span>
				</div>
				<div className={`${styles.barItem} ${styles.r}`}>
					<span>R</span>
					<span>
						{recipe.r * (poritonIndex + 1)}
						<small>g</small>
					</span>
				</div>
				<div className={`${styles.barItem} ${styles.kcal}`}>
					<span>
						<Flame className={styles.iconFlame} />
					</span>
					<span>
						{recipe.kcal * (poritonIndex + 1)}
						<small>kcal</small>
					</span>
				</div>
			</div>

			<div className={styles.preparing}>
				<div className={styles.preparingLabel}>Paruošimas</div>

				<div className={styles.description}>{recipe.description}</div>

				{recipe.video_link && (
					<div className={styles.watchVideo}>
						<Link to={recipe.video_link} className={styles.videoLink}>
							<CirclePlay className={styles.iconPlay} />
							<span>Žiūrėti video</span>
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};
