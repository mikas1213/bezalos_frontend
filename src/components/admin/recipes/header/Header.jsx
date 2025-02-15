
import styles from './Header.module.css';

const Header = ({ setOpen }) => {
    return (
        <div className={styles.header}>
            <button 
                className={styles.addButton}
                onClick={() => setOpen(true)}
            >Naujas receptas +</button>
        </div>
    );
};

export default Header;