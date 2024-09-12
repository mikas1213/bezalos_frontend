import styles from './NutritionTab.module.css';
import { NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';

const NutritionTab = () => {
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
                return;
        }
    });

    return (
        <div className={styles.wrapper}>
            <div className={`${styles.tabSwitch} ${styles[side]} ${styles.textCenter}`}>
                <div className={`${styles.tab} ${side === 'templates' ? styles.active : ''}`} onClick={() => setSide('templates')}>
                    <NavLink to='/admin/planai'>Šablonai</NavLink>
                </div>
                <div className={`${styles.tab} ${side === 'meals' ? styles.active : ''}`} onClick={() => setSide('meals')}>
                    <NavLink to='/admin/planai/valgiai'>Valgiai</NavLink>
                </div>
                <div className={`${styles.tab} ${side === 'products' ? styles.active : ''}`} onClick={() => setSide('products')}>
                    <NavLink to='/admin/planai/produktai'>Produktai</NavLink>
                </div>
            </div>
        </div>
    );
};

export default NutritionTab;
