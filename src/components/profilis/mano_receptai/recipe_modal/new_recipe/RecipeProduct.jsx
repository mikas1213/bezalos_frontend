import styles from './RecipeProduct.module.css';
import { DeleteBin_icon } from '../../../../../svg/icons';

const RecipeProduct = ({ prod, children }) => {
    
    return (
        <div className={styles.recipeProduct}>
            <span className={styles.prodTitle}>{prod.title}</span>
            <div className={styles.prodLeft}>
                <div className={styles.gramsContainer}>
                    { children }
                    <span className={styles.gramsChar}>g</span>
                </div>
                <span className={styles.deleteIconContainer}><DeleteBin_icon icon={styles.deleteIcon}/></span>
            </div>
       </div>
    );
};

export default RecipeProduct;