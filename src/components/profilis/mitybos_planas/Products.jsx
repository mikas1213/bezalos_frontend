import styles from './Products.module.css';

const Products = ({ isShowProd, meal, is_subscription }) => {
    
    return (
        <div className={`${styles.products} ${isShowProd ? styles.show : ''}`}>
            <div className={styles.productsInner}>
                <div className={styles.prodContainer}>
                    {meal.products.map(prod => <div key={meal.id + prod.id} className={styles.product}>
                        <div className={styles.btn}>
                            <button>keisti</button>
                        </div>
                        <span className={styles.title}>{prod.title}</span>
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