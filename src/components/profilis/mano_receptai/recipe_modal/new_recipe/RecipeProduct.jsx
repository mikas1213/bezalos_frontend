import styles from './RecipeProduct.module.css';
import { DeleteBin_icon } from '../../../../../svg/icons';

const RecipeProduct = ({ prod, handleProductDelete, children }) => {
    
    return (
        <div className={styles.recipeProduct}>
            <span className={styles.prodTitle}>{prod.title}</span>
            <div className={styles.prodRight}>
                <div className={styles.gramsContainer}>
                    { children }
                    <span className={styles.gramsChar}>g</span>
                </div>
                <span
                    onClick={() => handleProductDelete(prod.id)} 
                    className={styles.deleteIconContainer}
                ><DeleteBin_icon icon={styles.deleteIcon}/></span>
            </div>
       </div>
    );
};

export default RecipeProduct;