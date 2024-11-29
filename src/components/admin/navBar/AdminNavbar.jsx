import styles from './AdminNavbar.module.css';
import { NavLink, useLocation } from 'react-router-dom';
import { FaHouse, FaUserGroup, FaList, FaFilm, FaNoteSticky } from 'react-icons/fa6';
import { TbMailFilled } from "react-icons/tb";
import { IoFastFoodSharp } from 'react-icons/io5';
import { HiTemplate } from 'react-icons/hi';

const AdminNavbar = ({ isLoading, stats }) => {
    const location = useLocation();

    const links = [
        {to: '/admin', label: 'Klientai', icon: <FaUserGroup />, notification: !isLoading && `${stats.users} / ${stats.virtuve_active} / ${stats.profilis_active}`},
        {to: '/admin/planai' , label: 'Mitybos planai', icon: <HiTemplate />},
        {to: '/admin/maistas' , label: 'Maistas', icon: <FaList />},
        {to: '/admin/receptai' , label: 'Receptai', icon: <IoFastFoodSharp />},
        {to: '/admin/videos' , label: 'Videos', icon: <FaFilm />},
        {to: '/admin/mails' , label: 'Mails', icon: <TbMailFilled />, notification: !isLoading && `${stats.offer_mails} / ${stats.mailer_list_mails}`},
        {to: '/admin/test3' , label: 'Test', icon: <FaNoteSticky />}
    ];

    const isLinkActive = (path) => {
        
        if(path === '/admin') {
            return location.pathname === '/admin' || location.pathname === '/admin/';
        } 
        return location.pathname.startsWith(path);
    };

    return (
        <div className={styles.adminNav}>
            <li className={`${styles.navItem} ${styles.navItemHome}`}>
                <NavLink to='/'><FaHouse />Pradžia</NavLink>
            </li>
            
            {links.map(link =><li key={link.to} className={styles.navItem}>
                <NavLink to={link.to} className={({ isActive }) => isActive && isLinkActive(link.to) ? styles.active : ''}>
                    {link.icon}{link.label} 
                    {link.notification && <span className={styles.notification}>{link.notification}</span>}
                </NavLink>
            </li>)}
        </div>
    );
};

export default AdminNavbar;
