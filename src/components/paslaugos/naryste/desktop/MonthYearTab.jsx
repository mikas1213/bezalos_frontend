import styles from './MonthYearTab.module.css';
import usePayment from '../../../../hooks/usePayment';

const MonthYearTab = () => {
    const { period, setPeriod } = usePayment();
    
    return (
        <div className={styles.wrapper}>
            <div className={`${styles.tabSwitch} ${styles[period]} ${styles.textCenter}`}>
                <div className={`${styles.tab} ${period === 'month' ? styles.active : ''}`} onClick={() => setPeriod('month')}>Už mėnesį</div>
                <div className={`${styles.tab} ${period === 'year' ? styles.active : ''}`} onClick={() => setPeriod('year')}>Už metus</div>
            </div>
        </div>
    );
};

export default MonthYearTab;
