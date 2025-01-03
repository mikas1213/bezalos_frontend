import styles from './Filters.module.css';

const FilterOption = ({ label, checked, onChange, wrap = true}) => {
    const lt_names = {
        week: '2 sav.',
        month: '1 mėn.',
        maintenance: 'Priežiūra',
        service: 'Planai'
    };

    const filterContent = 
        <div className={styles.filter}>
            <input type='checkbox' id={label} name={label} checked={checked} onChange={onChange} />
            <label htmlFor={label}>{lt_names[label]}</label>
        </div>;

    return wrap ? <div className={styles.filterGroup}>{filterContent}</div> : filterContent;
};

const Filters = ({ sort, setSort, setCurrentPage }) => {

    const handleChange = (field, exclusions) => {
        setCurrentPage(1);
        setSort(prevSort => {
            const newSort = { ...prevSort };
            exclusions.forEach(key => newSort[key] = false);
            newSort[field] = !prevSort[field];
            return newSort;
        });
    }

    return (
        <div className={styles.filters}>
            <div className={styles.filterGroup}>
                <span className={styles.filterTitle}>Planas priskirtas</span>
                <FilterOption 
                    wrap={false}
                    label='week' 
                    checked={sort.week}
                    onChange={() => handleChange('week', ['maintenance', 'service'])}
                />

                <FilterOption 
                    wrap={false}
                    label='month' 
                    checked={sort.month}
                    onChange={() => handleChange('month', ['maintenance', 'service'])}
                />
            </div>

            <FilterOption 
                label='maintenance' 
                checked={sort.maintenance}
                onChange={() => handleChange('maintenance', ['week', 'month', 'service'])}
            />

            <FilterOption 
                label='service' 
                checked={sort.service}
                onChange={() => handleChange('service', ['week', 'month', 'maintenance'])}
            />
        </div>
    );
};

export default Filters;