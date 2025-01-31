import styles from './Filters.module.css';
import { useState, useEffect, useRef} from 'react';
import { Filter, Utensils, Clock, Donut} from 'lucide-react';

const filterGroups = {
    main: {
        label: 'Pagrindiniai',
        icon: <Filter className={styles.icon} />,
        filters: ['Visi', 'Be mėsos']
    },

    meal: {
        label: 'Valgio tipas',
        icon: <Utensils className={styles.icon} />,
        filters: ['Pusryčiai', 'Pietūs', 'Vakarienė', 'Užkandžiai']
    },

    meal_group: {
        label: 'Grupė',
        icon: <Clock className={styles.icon} />,
        filters: ['A+B', 'B+R', 'A+R']
    },

    duration: {
        label: 'Gaminimo trukmė',
        icon: <Clock className={styles.icon} />,
        filters: ['Iki 15min.', '15-30min.', '30-60min.', 'Virš 60min.']
    },

    taste: {
        label: 'Pagal skonį',
        icon: <Donut className={styles.icon} />,
        filters: ['Saldu', 'Sūru', 'Aštru']
    }
};

const Filters = ({ isOpenFilters }) => {
    
    const [filtersHeight, setFilterHeight] = useState(0);
    const filtersRef = useRef(null);
    
    useEffect(() => {
        if (filtersRef.current) setFilterHeight(filtersRef.current.scrollHeight);
    }, []);
        
    const renderFilterGroup = (key, group) => (
         <div key={group.label} className={styles.filterGroup}>
            <div className={styles.chips}>
                {group.filters.map(filter => <span key={filter}
                    className={`${styles.chip} ${filters[key] === filter ? styles.active : ''}`}
                    onClick={() => toggleFilter(key, filter)}
                >{filter}</span>)}
            </div>
        </div>
    );

    const [filters, setFilters] = useState({ main: 'Visi' });
    const isAllFalse = (filters) => (filters.main !== 'Be mėsos' && !filters.meal && !filters.duration && !filters.taste && !filters.meal_group)
    
    const toggleFilter = (label, value) => {
        setFilters(prev => {
            let newFilters = { 
                ...prev, 
                [label]: prev[label] === value ? '' : value
            }

            if(value === 'Visi') {
                newFilters = { main: 'Visi' };
            } else if(label !== 'main' && newFilters.main !== 'Be mėsos') {
                newFilters.main = ''
            }

            if(isAllFalse(newFilters)) newFilters = { main: 'Visi' };
            return newFilters;
        })
    };

    return (
        <div ref={filtersRef}
            style={{height: isOpenFilters ? `${filtersHeight}px` : 0}}
            className={`${styles.filters} ${isOpenFilters ? styles.filterOpen : ''}`}
        >        
            {Object.keys(filterGroups).map(key => renderFilterGroup(key, filterGroups[key]))}
        </div>
    );
};

export default Filters;