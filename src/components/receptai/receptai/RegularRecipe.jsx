import styles from './RegularRecipe.module.css';
import { getImageURL } from '../../../utils/images';
import { Clock, Heart } from 'lucide-react';

const RegularRecipe = ({ recipe }) => {
    const rnr = Math.floor(Math.random() * 4) + 1;
    return (
        <div className={styles.recipe}>
            <div className={styles.imageContainer}>
                <img 
                    className={styles.image}
                    src={getImageURL(`recipes/image_${rnr}.png`)} 
                    alt={`image_${recipe.recipe}`} 
                />
            </div>
            
            <div className={styles.title}>{recipe.recipe}</div>

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

export default RegularRecipe;