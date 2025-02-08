import styles from './FavRecipe.module.css';
import { getImageURL } from '../../../utils/images';
import { Clock, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const FavRecipe = ({ recipe }) => {
    var r_num = Math.floor(Math.random() * (4 - 1 + 1)) + 1;    
    
    return (
        <div className={styles.favRecipe}>
            <Link to={`/receptai/${recipe.slug}`} className={styles.anchor}>
                <div className={styles.imageContainer}>
                    <img src={getImageURL(`recipes/image_${r_num}.png`)} alt={recipe.recipe} className={styles.image} />
                </div>

                <div className={styles.details}>
                    <div className={styles.title}>{recipe.recipe}</div>
                    <div className={styles.bottom}>
                        <div className={styles.item}>
                            <Clock className={styles.iconClock} />
                            <span>
                                {recipe.duration}
                                <small>min.</small>
                            </span>
                        </div>

                        <div className={styles.item}>
                            <span>{recipe.logic}</span>
                        </div>

                        <div className={styles.item}>
                            <Heart className={styles.iconHeart} />
                            <span>15</span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default FavRecipe;