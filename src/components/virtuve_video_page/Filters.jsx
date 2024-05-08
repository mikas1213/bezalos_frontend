import styles from './Filters.module.css';

const Filters = ({handleClick, filter}) => {

    return (
        <div className={styles.filters}>
            <span className={filter === '' ? styles.active : ''} onClick={() => handleClick('')}>Visi</span>
            <span className={filter === 'vebinaras' ? styles.active : ''} onClick={() => handleClick('vebinaras')}>Vebinarai</span>
            <span className={filter === 'mokymai' ? styles.active : ''} onClick={() => handleClick('mokymai')}>Mokymai</span>
            <span className={filter === 'emocinis' ? styles.active : ''} onClick={() => handleClick('emocinis')}>Emocinis valgymas</span>
            <span className={filter === 'mityba' ? styles.active : ''} onClick={() => handleClick('mityba')}>Mityba</span>
            <span className={filter === 'psichologija' ? styles.active : ''} onClick={() => handleClick('psichologija')}>Valgymo psichologija</span>
        </div>
    );
};

export default Filters;