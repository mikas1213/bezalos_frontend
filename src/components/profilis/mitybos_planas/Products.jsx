import styles from './Products.module.css';

const Products = ({ isShowProd, meal, is_subscription, onChangeProduct, setClickedProd, clickedProd }) => {
    return (
        <div className={`${styles.products} ${isShowProd ? styles.show : ''}`}>
            <div className={styles.productsInner}>
                <div className={styles.prodContainer}>

                    {meal.products.map(prod => <div key={meal.id + prod.id} className={styles.product}>                                          
                        <div className={styles.btn}>
                            <button onClick={(e) => {onChangeProduct(e, clickedProd === meal.id+prod.id, meal.logic, prod); setClickedProd(meal.id+prod.id)}}>keisti</button>
                        </div>
                        
                        <span className={styles.title}>
                            {prod.title}
                        </span>
                        <div className={styles.grams}>
                            <span>{prod.grams}</span><span>g</span>
                        </div>
                    </div>)}
                </div>
                
            </div>
        </div>
    );
};

export default Products;    