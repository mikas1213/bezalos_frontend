import styles from './UserNav.module.css';
import { NavLink, useLocation, useParams } from 'react-router-dom';

const UserNav = () => {
    const { id } = useParams();
    const location = useLocation();
    const links = [
        {to: `/admin/${id}`, label: 'Mitybos planai'},
        {to: `/admin/${id}/anketa` , label: 'Anketa'},
        {to: `/admin/${id}/statistika` , label: 'Statistika'}
    ];
    return (
        <div className={styles.userNav}>
            {links.map(link => 
                <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) => isActive && location.pathname === link.to ? styles.active : ''}
                >
                    {link.label}
                </NavLink>
            )}
        </div>
    );
};


export default UserNav;