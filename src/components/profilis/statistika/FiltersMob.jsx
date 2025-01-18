import styles from './FiltersMob.module.css';

const timeFrames = [
    {frame: '1month', label: '1 mėnesis', label_mob: '1 mėn.'},
    {frame: '3months', label: '3 mėnesiai', label_mob: '3 mėn.'},
    {frame: '6months', label: '6 mėnesiai', label_mob: '6 mėn.'},
    {frame: '1year', label: '1 metai', label_mob: '12 mėn.'},
    {frame: 'alltime', label: 'Visa trukmė', label_mob: 'Viskas'}
];


const FiltersMob = ({ timeFrame, setTimeFrame }) => {
    return (
        <div className={styles.filtersMob}>
            {timeFrames.map(option => <span 
                key={option.frame}
                onClick={() => setTimeFrame(option)}
                className={`${styles.option} ${timeFrame.frame === option.frame ? styles.active : ''}`}
                >{option.label_mob}
            </span>)}
        </div>
    );
};

export default FiltersMob;