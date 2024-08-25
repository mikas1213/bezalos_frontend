import styles from './Filters.module.css';

const Filters = ({ sort, setSort }) => {
    return (
        <div className={styles.filters}>
            <div className={styles.planasPriskirtasFilter}>
                <span className={styles.filterTitle}>Planas priskirtas</span>
                
                <div className={styles.filter}>
                    <input type='checkbox' id='two_weeks' name='week' checked={sort.week} onChange={() => setSort(prevSort => ({...prevSort, week: !prevSort.week}))} />
                    <label htmlFor='two_weeks'>2 sav.</label>
                </div>

                <div className={styles.filter}>
                    <input type='checkbox' id='one_month' value='month' checked={sort.month} onChange={() => setSort(prevSort => ({...prevSort, month: !prevSort.month}))} />
                    <label htmlFor='one_month'>1 mėn.</label>
                </div>
            </div>
        </div>
    );
};

export default Filters;