import styles from './Filters.module.css';
import { ChevronLeft } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const timeFrames = [
    {frame: '1month', label: '1 mėnesis', label_mob: '1 mėn.'},
    {frame: '3months', label: '3 mėnesiai', label_mob: '3 mėn.'},
    {frame: '6months', label: '6 mėnesiai', label_mob: '6 mėn.'},
    {frame: '1year', label: '1 metai', label_mob: '12 mėn.'},
    {frame: 'alltime', label: 'Visa trukmė', label_mob: 'Viskas'}
];

const Filters = ({ timeFrame, setTimeFrame }) => {
    const [timeFrameOpen, setTimeFrameOpen] = useState(false);
    const refOptions = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if(refOptions.current && !refOptions.current.contains(e.target)) {
                setTimeFrameOpen(false);
            }
        }
        document.addEventListener('click', handleOutsideClick);
        return () => document.removeEventListener('click', handleOutsideClick);
    }, []);

    return (
        <div className={styles.filters}>
            <div 
                className={`${styles.timeFrame} ${timeFrameOpen ? styles.open : ''}`} 
                onClick={(e) => { setTimeFrameOpen(!timeFrameOpen); e.stopPropagation() }}>
                <span className={styles.label_desktop}>{timeFrame.label}</span>
                <span className={styles.label_mob}>{timeFrame.label_mob}</span>
                <ChevronLeft className={styles.selectIcon} />
            </div>

            <div ref={refOptions} className={`${styles.options} ${timeFrameOpen ? styles.showOptions : ''}`}>
                {timeFrames.map(option => <div
                    key={option.frame} 
                    className={styles.option} 
                    onClick={() => {
                        setTimeFrame(option);
                        setTimeFrameOpen(false);
                    }}>
                        <span className={styles.label_desktop}>{option.label}</span>
                        <span className={styles.label_mob}>{option.label_mob}</span>
                </div>)}
            </div>
        </div>
    );
};

export default Filters;