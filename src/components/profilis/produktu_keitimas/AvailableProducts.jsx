import styles from './AvailableProducts.module.css';
import { set_grams_keitykle } from '../../../utils/calculationsHelpers';

const AvailableProducts = ({ prodList, selectedProd, grams }) => {
    return (
        <div className={styles.availableProducts}>
            {prodList.filter(prod => prod.category === selectedProd.category).map(prod => 
                <div key={prod.id} className={styles.availProd}>
                    <span className={styles.prodTitle}>{prod.title}</span>
                    <div className={styles.gramsContainer}>
                        <span>{set_grams_keitykle({...selectedProd, grams: +grams.replace(',', '.')}, prod ).toFixed(0)}</span>
                        <span>g</span>
                    </div>        
                </div>
            )}
        </div>
    );
};

export default AvailableProducts;