import styles from './Filters.module.css';

const Filters = ({handleClick, filter}) => {

    return (
        <div className={styles.filters}>
            <div className={filter === '' ? styles.active : ''} onClick={() => handleClick('')}>Visi</div>
            <div className={filter === 'vebinaras' ? styles.active : ''} onClick={() => handleClick('vebinaras')}>Vebinarai</div>
            <div className={filter === 'trumpai' ? styles.active : ''} onClick={() => handleClick('trumpai')}>Trumpai</div>
            <div className={filter === 'emocinis' ? styles.active : ''} onClick={() => handleClick('emocinis')}>Emocinis valgymas</div>
            <div className={filter === 'mityba' ? styles.active : ''} onClick={() => handleClick('mityba')}>Mityba</div>
            <div className={filter === 'psichologija' ? styles.active : ''} onClick={() => handleClick('psichologija')}>Valgymo psichologija</div>
        </div>
    );
};

export default Filters;