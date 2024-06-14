import styles from './Plans.module.css';

const Plans = ({ children }) => {
    return (
        <div className={styles.plans}>
            {children}
        </div>
    );
};

export default Plans;