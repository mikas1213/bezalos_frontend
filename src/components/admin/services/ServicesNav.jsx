import styles from './ServicesNav.module.css';
import { NavLink, useLocation } from 'react-router-dom';
import { CirclePlus } from 'lucide-react';
import { Divider } from '../nutrition_plans/Divider';

const ServicesNav = ({ isModalOpen, handleModalOpen }) => {
    const location = useLocation();
    const add_item = location.pathname === '/admin/paslaugos' ? 'Paslaugą' : location.pathname === '/admin/paslaugos/nuolaidos-kodai' ? 'Kodą' : 'Narystę';

    return (
        <div className={styles.servicesNav}>
            <button disabled={isModalOpen.isOpen ? true : false}
                className={styles.addBtn}
                onClick={() => handleModalOpen(true, add_item, 'insert')}
            >
                Pridėti {add_item}
                <CirclePlus className={styles.iconAdd} />
            </button>

            <Divider />
            
            <div className={styles.servicesPages}>
                <NavLink onClick={() => handleModalOpen(false)} to='/admin/paslaugos' end className={({ isActive }) => isActive ? styles.active: ''}>
                    Paslaugos
                </NavLink>
                
                <NavLink onClick={() => handleModalOpen(false)} to='nuolaidos-kodai' className={({ isActive }) => isActive ? styles.active: ''}>
                    Nuolaidos kodai
                </NavLink>

                <NavLink onClick={() => handleModalOpen(false)} to='narystes' className={({ isActive }) => isActive ? styles.active: ''}>
                    Narystės
                </NavLink>
            </div>


        </div>
    );
};

export default ServicesNav;