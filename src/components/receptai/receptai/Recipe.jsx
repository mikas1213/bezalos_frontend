import styles from './Recipe.module.css';
import { getImageURL } from '../../../utils/images';
import { Clock, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Recipe = ({ recipe, onToggleLikes }) => {
    console.log('Recipe: ', recipe)
    return (
        <div className={styles.recipe}>
            <div className={styles.imageContainer}>
                <Link to={`/receptai/${recipe.slug}`}>
                    <img 
                        className={styles.image}
                        src={getImageURL(`recipes/${recipe.slug}.png`)} 
                        alt={`image_${recipe.recipe}`} 
                    />
                </Link>
            </div>
            
            <div className={styles.title}>
                <Link to={`/receptai/${recipe.slug}`} className={styles.anchor}>{recipe.recipe}</Link>
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
                <span
                    className={`${styles.item} ${styles.likes}`}
                    onClick={() => onToggleLikes(recipe.id)}
                >
                    <Heart className={`${styles.icon} ${recipe.liked ? styles.liked : ''}`}/>{recipe.likes}
                </span>
            </div>
        </div>
    );
};

export default Recipe;