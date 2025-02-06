import styles from './FavRecipe_v2.module.css';
import { getImageURL } from '../../../utils/images';
import { 
    // Clock, 
    Heart 
} from 'lucide-react';

const FavRecipe = ({ recipe }) => {
    // const imageUrl = 'image_5'
    return (


        <div className={styles.favRecipe}>
            <div className={styles.imageContainer}>
                <img src={getImageURL(`recipes/image_4.png`)} alt={recipe.recipe} className={styles.image} />
            </div>


            <div className={styles.details}>
                <div className={styles.title}>{recipe.recipe}</div>      
                <div className={styles.duration}>
                    <span>
                        {/* <Clock className={styles.icon} /> */}
                        </span>
                    <span>
                        {recipe.duration} min.
                    </span>
                </div>     
                <div className={styles.logic}>
                    {recipe.logic}
                </div>   

                
                <div className={styles.likes}>
                    <span><Heart className={styles.likeIcon}/></span>
                    <span className={styles.likesValue}>15</span>
                </div>  
            </div>
        </div>
    );
};

export default FavRecipe;