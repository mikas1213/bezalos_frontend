import styles from './NutritionTab.module.css';
import { NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';

import { TiShoppingCart } from 'react-icons/ti';
import { GiOpenedFoodCan } from 'react-icons/gi';
import { CgTemplate } from 'react-icons/cg';


const NutritionTab = ({ isLoading, stats }) => {
    
    const location = useLocation();
    const [side, setSide] = useState(() => {
        switch(location.pathname) {
            case '/admin/planai':
            case '/admin/planai/':
                return 'templates';
            case '/admin/planai/valgiai':
            case '/admin/planai/valgiai/':
                return 'meals'
            case '/admin/planai/produktai':
            case '/admin/planai/produktai/':
                return 'products'; 
            default:
                return 'templates'
        }
    });

    return (
        <div className={styles.wrapper}>
            <div className={`${styles.tabSwitch} ${styles[side]} ${styles.textCenter}`}>
                <div className={`${styles.tab} ${side === 'templates' ? styles.active : ''}`} onClick={() => setSide('templates')}>
                    <NavLink to='/admin/planai'><CgTemplate className={styles.icon} />
                        Šablonai
                        {!isLoading && <span className={styles.stats}>{stats.plans}</span>}
                        </NavLink>
                </div>
                <div className={`${styles.tab} ${side === 'meals' ? styles.active : ''}`} onClick={() => setSide('meals')}>
                    <NavLink to='/admin/planai/valgiai'><GiOpenedFoodCan className={styles.icon} />
                        Valgiai
                        {!isLoading && <span className={styles.stats}>{stats.meals}</span>}
                    </NavLink>
                </div>
                <div className={`${styles.tab} ${side === 'products' ? styles.active : ''}`} onClick={() => setSide('products')}>
                    <NavLink to='/admin/planai/produktai'><TiShoppingCart className={styles.icon} />
                        Produktai
                        {!isLoading && <span className={styles.stats}>{stats.products}</span>}
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default NutritionTab;
