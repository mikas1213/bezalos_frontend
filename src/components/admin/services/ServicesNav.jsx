import styles from './ServicesNav.module.css';
import { NavLink, useLocation } from 'react-router-dom';
import { CirclePlus } from 'lucide-react';
import { Divider } from '../nutrition_plans/Divider';

const ServicesNav = ({ isModalOpen, handleModalOpen }) => {
    const location = useLocation();
    const add_item = location.pathname === '/admin/paslaugos' ? 'services' : location.pathname === '/admin/paslaugos/nuolaidos-kodai' ? 'promo' : 'subscription';

    return (
        <div className={styles.servicesNav}>
            <button disabled={isModalOpen.isOpen ? true : false}
                className={styles.addBtn}
                onClick={() => handleModalOpen(true, add_item, 'insert')}
            >
                {add_item === 'services' && 'Pridėti paslaugą'}
                {add_item === 'promo' && 'Pridėti kodą'}
                {add_item === 'subscription' && 'Pridėti narystę'}
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