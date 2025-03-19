import styles from './Filters.module.css';
import { useState, useEffect, useRef} from 'react';
import { CircleX } from 'lucide-react';

const filterGroups = {
    dietary: [
        {label: 'Be mėsos', value: 'vegan'}
    ],
    type: [
        {label: 'Pusryčiai', value: 'Pusryčiai'}, 
        {label: 'Pietūs', value: 'Pietūs'}, 
        {label: 'Vakarienė', value: 'Vakarienė'}, 
        {label: 'Užkandžiai', value: 'Užkandžiai'}
    ],
    meal: [
        {label: 'A+B', value: 'A+B'}, 
        {label: 'B+R', value: 'B+R'}, 
        {label: 'A+R', value: 'A+R'}
    ],
    time: [
        {label: 'Iki 15min.', value: '0-15'}, 
        {label: '15-30min.', value: '15-30'}, 
        {label: '30-60min.', value: '30-60'}, 
        {label: 'Virš 60min.', value: '60-600'}
    ],
    flavor: [
        {label: 'Saldu', value: 'Saldu'}, 
        {label: 'Sūru', value: 'Sūru'}, 
        {label: 'Aštru', value: 'Aštru'}
    ]
};
// const filterGroups = {
//     is_vegetarian: ['Be mėsos'],
//     recipe_type: ['Pusryčiai', 'Pietūs', 'Vakarienė', 'Užkandžiai'],
//     food_logic: ['A+B', 'B+R', 'A+R'],
//     duration: ['Iki 15min.', '15-30min.', '30-60min.', 'Virš 60min.'],
//     taste: ['Saldu', 'Sūru', 'Aštru']
// };
const hasProperties = obj => Object.values(obj).some(val => val !== '');
const Filters = ({ isOpenFilters, mediaQuery, filters, setFilters, setCurrentPage}) => {

    const [filtersHeight, setFilterHeight] = useState(0);
    const filtersRef = useRef(null);
    useEffect(() => {
        const updateFilterHeight = () => {
            if (filtersRef.current) setFilterHeight(filtersRef.current.scrollHeight);
        }
        updateFilterHeight();
        window.addEventListener('resize', updateFilterHeight);
        return () => {
            window.removeEventListener('resize', updateFilterHeight);
        };
    }, []);

    const isAllEmpty = filters => (!filters.dietary && !filters.type && !filters.meal && !filters.time && !filters.flavor)
    const renderFilterGroup = (key, group) => {
        return <div className={styles.filterGroup} key={key}>
            {group.map(filter => <span key={filter.label}
                className={`${styles.chip} ${filters[key] === filter.value ? styles.active : ''}`}
                onClick={() => {
                    setFilters(prevState => ({ ...prevState, [key]: prevState[key] !== filter.value ? filter.value : ''}));
                    setCurrentPage(1);
                }}
            >{filter.label}</span>)}
        </div>;
    };

    // const isAllEmpty = filters => (!filters.is_vegetarian && !filters.recipe_type && !filters.food_logic && !filters.duration && !filters.taste)
    // const renderFilterGroup = (key, group) => {
    //     console.log('frou: ', key, group)
    //     return <div className={styles.filterGroup} key={key}>
    //         {group.map(filter => <span key={filter}
    //             className={`${styles.chip} ${filters[key] === filter ? styles.active : ''}`}
    //             onClick={() => {
    //                 setFilters(prevState => ({ ...prevState, [key]: prevState[key] !== filter ? filter : ''}));
    //                 setCurrentPage(1);
    //             }}
    //         >{filter}</span>)}
    //     </div>;
    // };

    return (
        <>  
            <div ref={filtersRef}
                style={{height: isOpenFilters || mediaQuery > 440 ? `${filtersHeight}px` : 0}}
                className={`${styles.filters} ${mediaQuery < 441 ? styles.filterMobile : ''}`}
            >        

                <div className={`${styles.filterGroup} ${styles.filterVisi}`}>
                    <span className={`${styles.chip} ${isAllEmpty(filters) ? styles.active : ''}`}
                    onClick={() => setFilters({})}
                    >Visi</span>
                </div>

                {Object.keys(filterGroups).map(key => renderFilterGroup(key, filterGroups[key]))}
            </div>

            {hasProperties(filters) && !isOpenFilters && mediaQuery < 441 && <div className={styles.selectedFilters}>
                {Object.entries(filters).map(([key, val]) => val !== '' && <span
                    key={val}
                    onClick={() => setFilters(prev => ({...prev, [key]: ''}))}
                    className={styles.selectedChip}>
                    {val === true ? 'Be mėsos' : val.indexOf('-') > -1 ? `${val}min.` : val}
                    
                    <CircleX className={styles.chipIcon} />
                </span>)}
            </div>}
            {/* {hasProperties(filters) && !isOpenFilters && mediaQuery < 441 && <div className={styles.selectedFilters}>
                {Object.entries(filters).map(([key, val]) => val !== '' && <span
                    key={val}
                    onClick={() => setFilters(prev => ({...prev, [key]: ''}))}
                    className={styles.selectedChip}>
                    {val}<CircleX className={styles.chipIcon} />
                </span>)}
            </div>} */}
        </>
    );
};

export default Filters;