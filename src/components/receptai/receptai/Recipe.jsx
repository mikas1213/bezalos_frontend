import styles from './Recipe.module.css';
import { Clock, Heart } from 'lucide-react';
import { getImageURL } from '../../../utils/images';
import { Link } from 'react-router-dom';

const Recipe = ({ recipe }) => {
    const rnr = Math.floor(Math.random() * 4) + 1;
    return (
        <div className={styles.recipe}>
            <div className={styles.imageContainer}>
                <Link to={`/receptai/${recipe.slug}`}>
                    <img 
                        className={styles.image}
                        src={getImageURL(`recipes/image_${rnr}.png`)} 
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
                <span className={styles.item}>{recipe.logic}</span>
                <span className={styles.item}><Heart className={styles.icon}/> 15</span>
            </div>
        </div>
    );
};

export default Recipe;