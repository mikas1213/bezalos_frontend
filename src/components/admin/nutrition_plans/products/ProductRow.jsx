import styles from './ProductRow.module.css';
import { IoTrashBin } from 'react-icons/io5';
import { useRef } from 'react';
import ProdCell from './ProdCell';

const ProductRow = ({ 
    product, 
    clickedProduct, 
    setClickedProduct, 
    setIsClickedDelete, 
    isClickedDelete, 
    handleDeleteProduct,
    clickedCell,
    setClickedCell,
    handleEditProduct
}) => {
    const del = useRef(null);
    const isDelete = product.id === clickedProduct && isClickedDelete;
    const subCategoryVal = product.sub_category ? product.sub_category : '- - - - - -';

    return (
        <div ref={del} className={styles.row}>
            {['title', 'proteins', 'carbs', 'fat', 'category', 'sub_category'].map(item=> 
                <ProdCell key={item}
                    prodId={product.id} 
                    cellName={item} 
                    className={styles[item]} 
                    value={item === 'sub_category' ? subCategoryVal : product[item]} 
                    handleEditProduct={handleEditProduct} 
                    setClickedCell={setClickedCell} 
                    clickedCell={clickedCell} 
                />
            )}

            <span 
                className={styles.icon} 
                onClick={() => { 
                    setClickedProduct(product.id);
                    setIsClickedDelete(click => product.id === clickedProduct ? !click : true)
                }}><IoTrashBin />
            </span>
            {isDelete && <button 
                className={styles.deleteBtn} 
                onClick={() => {
                    handleDeleteProduct(product.id); del.current.classList.add(styles.deleted)
                }}
            >trinti</button>}
        </div>
    );
};

export const ProductRowH = ({ count }) => {
    return (
        <div className={styles.rowH}> 
            <span className={styles.title}>Pavadinimas <span className={styles.count}>{count}</span></span>
            <span className={styles.proteins}>B</span>
            <span className={styles.carbs}>A</span>
            <span className={styles.fat}>R</span>
            <span className={styles.category}>Kategorija</span>
            <span className={styles.sub_category}>Sub kategorija</span>
            <span className={styles.icon}><IoTrashBin /></span>
        </div>
    );
};

export default ProductRow;