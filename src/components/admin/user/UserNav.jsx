import styles from './UserNav.module.css';
import { NavLink, useLocation } from 'react-router-dom';

const UserNav = () => {

    const location = useLocation();
    const links = [
        {to: '/admin/user', label: 'Mitybos planas'},
        {to: '/admin/user/anketa' , label: 'Anketa'}
    ];
    return (
        <div className={styles.userNav}>
            {links.map(link => 
                <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) => isActive && location.pathname === link.to ? styles.active : ''}
                >{link.label}</NavLink>
            )}
        </div>
    );
};


export default UserNav;