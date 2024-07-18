import styles from './Overlay.module.css';

const Overlay = ({children}) => {
    return (
        <div className={styles.overLay}>
            {children}
        </div>
    );
};

export default Overlay;