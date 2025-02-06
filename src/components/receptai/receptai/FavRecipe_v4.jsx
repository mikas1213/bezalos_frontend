import styles from './FavRecipe_v4.module.css';
import { getImageURL } from '../../../utils/images';
import { Clock, Heart } from 'lucide-react';

const FavRecipe = ({ recipe }) => {
    var r_num = Math.floor(Math.random() * (4 - 1 + 1)) + 1;    
    return (
        <div 
            className={styles.favRecipe}
            style={{backgroundImage: `url('${getImageURL(`recipes/image_${r_num}.png`)}')`}}
        >
            <div className={styles.details}>
                <span className={styles.title}>{recipe.recipe}</span>
                <div className={styles.duration}>
                    <div>
                        <span><Clock className={styles.iconClock} /></span>
                        <span className={styles.time}>15 min.</span>
                    </div>

                    <div>
                        <span><Heart className={styles.iconHeart}/></span>
                        <span className={styles.likes}>15</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FavRecipe;