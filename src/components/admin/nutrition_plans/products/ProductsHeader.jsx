import styles from './ProductsHeader.module.css';
import AddProduct from './AddProduct';
import Filters from './Filters';

const ProductsHeader = ({ handleAddProduct, handleSearchProduct }) => {
    return (
        <div className={styles.productsHeader}>
            <AddProduct handleAddProduct={handleAddProduct} />
            <Filters handleSearchProduct={handleSearchProduct} />
        </div>
    );
};

export default ProductsHeader;