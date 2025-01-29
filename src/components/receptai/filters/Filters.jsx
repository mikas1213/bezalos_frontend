import styles from './Filters.module.css';
import { useState } from 'react';
import { Filter, Utensils, Clock, Donut} from 'lucide-react';


const filtersGrouped = {
    ['Pagrindiniai']: {
        icon: <Filter className={styles.icon} />,
        filters: [
            { id: 'visi', label: 'Visi' },
            { id: 'beMesos', label: 'Be mėsos' },
        ],
    },
    ['Valgio tipas']: {
        icon: <Utensils className={styles.icon} />,
        filters: [
            { id: 'pusryciai', label: 'Pusryčiai' },
            { id: 'pietus', label: 'Pietūs' },
            { id: 'vakariene', label: 'Vakarienė' },
            { id: 'uzkandziai', label: 'Užkandžiai' },
        ],
    },
    ['Gaminimo trukmė']: {
        icon: <Clock className={styles.icon} />,
        filters: [
            { id: 'iki15', label: 'Iki 15min.' },
            { id: '15-30', label: '15-30min.' },
            { id: '30-60', label: '30-60min.' },
            { id: 'virs60', label: 'Virš 60min.' },
        ],
    },
    ['Pagal skonį']: {
        icon: <Donut className={styles.icon} />,
        filters: [
            { id: 'saldu', label: 'Saldu' },
            { id: 'suru', label: 'Sūru' },
            { id: 'astru', label: 'Aštru' },
        ],
    },
};  

const Filters = () => {
    const [selectedFilters, setSelectedFilters] = useState({
        'Pagrindiniai': {visi: true},
        'Valgio tipas': {},
        'Gaminimo trukmė': {},
        'Pagal skonį': {}
    });
    
    const toggleFilter = (label, id) => {

        setSelectedFilters(prev => {

            if (id === 'visi') {
                return {Pagrindiniai: {visi: true}};
            } else {
                if(Object.keys(prev['Pagrindiniai'])?.length === 0) {
                    return {Pagrindiniai: {visi: true}};
                }
                // console.log(Object.keys(prev['Pagrindiniai'])?.length === 0 &&
                // Object.keys(prev['Valgio tipas'])?.length === 0 && 
                // Object.keys(prev['Gaminimo trukmė'])?.length === 0 && 
                // Object.keys(prev['Pagal skonį'])?.length === 0)
                return {
                    ...prev,
                    Pagrindiniai: {...prev['Pagrindiniai'], visi: false},
                    [label]: (!prev[label]?.[id] ? {[id]: !prev[label]?.[id]} : {})
                    // [label]: {[id]: !prev[label]?.[id]}
                }
            }
        });
    };

    const renderFilterGroup = (label, group) => (
        
        <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>
                {group[label].icon}{label}
            </span>

            <div className={styles.chips}>
                {group[label].filters.map(option => <span 
                    key={option.id}
                    className={`${styles.chip} ${selectedFilters[label]?.[option.id] ? styles.active : ''}`}
                    onClick={() => toggleFilter(label, option.id)}
                >{option.label}</span>)}
            </div>     
        </div>
    );

    return (
        <div className={styles.filters}>
            {renderFilterGroup('Pagrindiniai', filtersGrouped)}
            {renderFilterGroup('Valgio tipas', filtersGrouped)}
            {renderFilterGroup('Gaminimo trukmė', filtersGrouped)}
            {renderFilterGroup('Pagal skonį', filtersGrouped)}
        </div>
    );
};

export default Filters;