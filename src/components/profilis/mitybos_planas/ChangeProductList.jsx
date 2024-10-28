import styles from './ChangeProductList.module.css';

const ChangeProductList = ({ top, filteredProducts }) => {

    return (
        <div
            style={{ top }} 
            className={styles.changeProductListContainer}>
            <div className={styles.stogiukas}></div>
            <div className={styles.changeProductList}>
                {filteredProducts.map((prod, i) => <span key={i}>{prod.title}</span>)}
            </div>
            
        </div>
    );
};

export default ChangeProductList;

