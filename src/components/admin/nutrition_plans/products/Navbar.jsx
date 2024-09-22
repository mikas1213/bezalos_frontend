import styles from './Navbar.module.css';
import AddProduct from './AddProduct';
import Filters from './Filters';

const Navbar = ({ handleAddProduct, handleSearchProduct }) => {
    return (
        <div className={styles.navbar}>
            <AddProduct handleAddProduct={handleAddProduct} />
            <Filters handleSearchProduct={handleSearchProduct} />
        </div>
    );
};

export default Navbar;