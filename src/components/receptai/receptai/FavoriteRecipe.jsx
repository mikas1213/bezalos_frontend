import styles from './FavoriteRecipe.module.css';
import { getImageURL } from '../../../utils/images';

const FavoriteRecipe = ({ recipe, i }) => {

    return (
        <div className={styles.favoriteRecipe}>
            <div className={styles.imageContainer}>
                <img src={getImageURL(`recipes/image_${i+1}.png`)} alt="" />
            </div>
            <div>
                {recipe.recipe}
            </div>
        </div>
    );
};

export default FavoriteRecipe;