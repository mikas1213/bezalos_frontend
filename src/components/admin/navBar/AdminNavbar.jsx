import styles from './AdminNavbar.module.css';
import { NavLink, useLocation } from 'react-router-dom';
import { FaHouse, FaUserGroup, FaList, FaFilm, FaNoteSticky } from 'react-icons/fa6';
import { TbMailFilled } from "react-icons/tb";
import { IoFastFoodSharp } from 'react-icons/io5';
import { HiTemplate } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';

const AdminNavbarItem = ({ icon, title, url, notification = null }) => {    
    const location = useLocation();
    let compatiblePath = false;

    if(location.pathname === url || 
        location.pathname === url+'/' || 
        (location.pathname.indexOf(url) > -1 && url !== '/admin')) {
        compatiblePath = true;
    }

    return (
        <li className={`${styles.navItem} ${compatiblePath ? styles.active : ''}`}>
            <NavLink to={url}>
                {icon}{title} 
                {notification && <span className={styles.notification}>{notification}</span>}
            </NavLink>
        </li>
    );
};

const AdminNavbar = () => {
    
    const axiosPrivate = useAxiosPrivate();
    const [stats, setStats] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await axiosPrivate.get('/admin/stats');
                setStats(data.data.data);
                setIsLoading(false);
            } catch (err) {
                console.log(err.message)
            }
        }
        getData();
    }, [axiosPrivate]);

    const NavBarItems = {
        admin: {title: 'Klientai', icon: <FaUserGroup />, notification: !isLoading && `${stats.users} / ${stats.active_subscriptions}`},
        planai: {title: 'Mitybos planai', icon: <HiTemplate />},
        maistas: {title: 'Maistas', icon: <FaList />},
        receptai: {title: 'Receptai', icon: <IoFastFoodSharp />},
        videos: {title: 'Videos', icon: <FaFilm />},
        mails: {title: 'Mails', icon: <TbMailFilled />, notification: !isLoading && stats.mails},
        test3: {title: 'Test', icon: <FaNoteSticky />}
    }

    return (
        <div className={styles.adminNav}>
            <li className={`${styles.navItem} ${styles.navItemHome}`}>
                <NavLink to='/'><FaHouse />Pradžia</NavLink>
            </li>
            
            {Object.keys(NavBarItems).map(key => 
                <AdminNavbarItem 
                    key={key} 
                    url={`/admin${key === 'admin' ? '' : `/${key}`}`}
                    icon={NavBarItems[key].icon}
                    title={NavBarItems[key].title} 
                    notification={NavBarItems[key].notification}
                />
            )}
        </div>
    );
};

export default AdminNavbar;
