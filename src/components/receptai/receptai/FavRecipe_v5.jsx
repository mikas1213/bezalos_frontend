import styles from './FavRecipe_v5.module.css';
import { getImageURL } from '../../../utils/images';
import { 
    Clock, 
    Heart 
} from 'lucide-react';

const FavRecipe = ({ recipe }) => {
    // const imageUrl = 'image_5'
    return (


        <div className={styles.favRecipe}>
            <div className={styles.imageContainer}>
                <img className={styles.image} src={getImageURL(`recipes/image_4.png`)} alt={recipe.recipe} />
            </div>

            <div className={styles.details}>
                <div className={styles.title}>{recipe.recipe}</div>
                <div className={styles.bottom}>
                    <div className={styles.item}>
                        <Clock className={styles.iconClock}/>
                        {recipe.duration} 
                        {/* <small>min.</small> */}
                    </div>
                    <div className={styles.item}>
                        {recipe.logic}
                    </div>
                    <div className={styles.item}>
                        <Heart className={styles.iconHeart}/>
                        15
                    </div>
                </div>
            </div>
        </div>

        
    );
};

export default FavRecipe;