import styles from './Header.module.css';
import { RiPlayListAddLine } from 'react-icons/ri';
import { Search } from 'lucide-react';

const Header = ({ setModalControl, filters, setFilters }) => {
    return (
        <div className={styles.header}>
            <button 
                className={styles.addButton}
                onClick={() => setModalControl({isOpen: true, action: 'add'})}
            >
                Naujas receptas
                <RiPlayListAddLine className={styles.iconAdd} />
            </button>

            <div className={styles.inputGroup}>
                <input 
                    type='text' 
                    className={styles.input} 
                    placeholder='Paieška'
                    value={filters.search}
                    onChange={e => setFilters({search: e.target.value})}
                />
                <Search className={styles.iconSearch} />
                <button className={styles.clear} onClick={() => setFilters({search: ''})}>Valyti</button>
            </div>
            
        </div>
    );
};

export default Header;