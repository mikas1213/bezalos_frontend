import styles from './Products.module.css';
import { useState } from 'react';
import ProductRow, { ProductRowH } from './ProductRow';

const Products =({ products, isLoading, handleDeleteProduct, handleEditProduct }) => {
    const [clickedProduct, setClickedProduct] = useState('');
    const [isClickedDelete, setIsClickedDelete] = useState(false);

    const [clickedCell, setClickedCell] = useState({});
    return (
        <>
            <ProductRowH count={products.length}/>
            <div className={styles.products}>  
                {!isLoading && products.map(product => (
                    <ProductRow key={product.id} 
                        product={product}

                        clickedProduct={clickedProduct}
                        setClickedProduct={setClickedProduct} 

                        isClickedDelete={isClickedDelete}
                        setIsClickedDelete={setIsClickedDelete}
                        handleDeleteProduct={handleDeleteProduct}

                        clickedCell={clickedCell}
                        setClickedCell={setClickedCell}
                        handleEditProduct={handleEditProduct}
                    />
                ))}
            </div>
        </>
    );
};

export default Products;