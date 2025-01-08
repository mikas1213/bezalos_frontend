import styles from './StatistikaLayout.module.css';

const StatistikaLayout = ({ children }) => {
    return (
        <div className={styles.statistikaLayout}>
            {children}
        </div>
    );
};

export default StatistikaLayout;