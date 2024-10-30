import styles from './Products.module.css';
const cantChangeProd = ['Daržovės'];

const Products = ({ isShowProd, meal, onChangeProduct, setClickedProd, clickedProd }) => {
    return (
        <div className={`${styles.products} ${isShowProd ? styles.show : ''}`}>
            <div className={styles.productsInner}>
                <div className={styles.prodContainer}>
                    {meal.products.map(prod => <div key={meal.id + prod.id} className={styles.product}>                                          
                        <div className={styles.btn}>
                            <button 
                                disabled={cantChangeProd.includes(prod.title)} 
                                onClick={(e) => {
                                    onChangeProduct(e, clickedProd.m_id === meal.id && clickedProd.p_id === prod.id, meal.logic, prod); 
                                    setClickedProd({m_id: meal.id, p_id: prod.id});
                                }}
                            >keisti</button>
                        </div>
                        
                        <span className={styles.title}>
                            {prod.title}
                        </span>
                        <div className={styles.grams}>
                            <span>{prod.grams?.toFixed(0)}</span><span>g</span>
                        </div>
                    </div>)}
                </div>
                
            </div>
        </div>
    );
};

export default Products;    