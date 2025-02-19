import styles from './Recipe.module.css';
import { Clock, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getImageFromBlob } from '../../../utils/images';

const Recipe = ({ recipe, onToggleLikes }) => {

    return (
        <div className={styles.recipe}>
            <div className={styles.imageContainer}>
                <Link to={`/receptai/${recipe.slug}`}>
                    <img 
                        className={styles.image}

                        src={getImageFromBlob(recipe.photo_m, recipe.photo_type)} 
                        alt={`image_${recipe.title}`} 
                    />
                </Link>
            </div>
            
            <div className={styles.title}>
                <Link to={`/receptai/${recipe.slug}`} className={styles.anchor}>{recipe.title}</Link>
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