import styles from './FavRecipe.module.css';
import { Clock, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const FavRecipe = ({ recipe }) => {
    
    return (
        <div className={styles.favRecipe}>
            <Link to={`/receptai/${recipe.slug}`} className={styles.anchor}>
                <div className={styles.imageContainer}>
                    <img 
                        src={recipe.image_s}
                        alt={recipe.title} 
                        className={styles.image} 
                    />
                </div>

                <div className={styles.details}>
                    <div className={styles.title}>{recipe.title}</div>
                    <div className={styles.bottom}>
                        <div className={styles.item}>
                            <Clock className={styles.iconClock} />
                            <span>
                                {recipe.duration}
                                <small>min.</small>
                            </span>
                        </div>

                        <div className={styles.item}>
                            <span>{recipe.food_logic}</span>
                        </div>

                        <div className={styles.item}>
                            <Heart className={styles.iconHeart} />
                            <span>{recipe.like_count}</span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default FavRecipe;