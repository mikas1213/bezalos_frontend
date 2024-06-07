import styles from './Container.module.css';

const Container = ({ children }) => {
    return (
        <div className={styles.mainContainer}>
            {children}
        </div>
    );
};

export default Container;