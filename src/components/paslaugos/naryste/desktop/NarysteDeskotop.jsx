import styles from './NarysteDeskotop.module.css';

const NarysteDeskotop = ({ children }) => {
    
    return (
        <div className={styles.narysteDesktop}>
            {children}
        </div>
    );
};

export default NarysteDeskotop;