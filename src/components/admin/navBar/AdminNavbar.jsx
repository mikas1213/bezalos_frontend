import styles from './AdminNavbar.module.css';
import { NavLink, useLocation } from 'react-router-dom';
import { FaHouse, FaUserGroup, FaList, FaFilm, FaRegEnvelope } from 'react-icons/fa6';
import { IoFastFoodSharp } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';

const path = {
    admin: '/admin',
    maistas: '/admin/maistas',
    receptai: '/admin/receptai',
    videos: '/admin/videos',
    mails: '/admin/mails'
}

const AdminNavbar = () => {
    const location = useLocation();
    const axiosPrivate = useAxiosPrivate();
    const [users, setUsers] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await axiosPrivate.get('/admin/users');
                setUsers(data.data.users);
                setIsLoading(false);
            } catch (err) {
                console.log(err.message)
            }
        }
        getData();
    }, []);

    return (
        <div className={styles.adminNav}>
            <li className={`${styles.navItem} ${styles.navItemHome}`}><NavLink to='/'><FaHouse />Pradžia</NavLink></li>
            <li className={`${styles.navItem} ${location.pathname === path.admin ? styles.active : ''}`}>
                <NavLink to={path.admin}>
                    <FaUserGroup />
                    Klientai
                    {!isLoading && <span className={styles.usersCount}>
                        {users.length} / {users.filter(user => user.subscription_expires !== null || user.s_subscription_expires !== null).length}
                    </span>}
                </NavLink>
            </li>

            <li className={`${styles.navItem} ${location.pathname === path.maistas ? styles.active : ''}`}>
                <NavLink to={path.maistas}>
                    <FaList />
                    Maistas
                </NavLink>
            </li>
            <li className={`${styles.navItem} ${location.pathname === path.receptai ? styles.active : ''}`}>
                <NavLink to={path.receptai}>
                    <IoFastFoodSharp />
                    Receptai
                </NavLink></li>
            <li className={`${styles.navItem} ${location.pathname === path.videos ? styles.active : ''}`}>
                <NavLink to={path.videos}>
                    <FaFilm />
                    Videos
                </NavLink>
            </li>
            <li className={`${styles.navItem} ${location.pathname === path.mails ? styles.active : ''}`}>
                <NavLink to={path.mails}>
                    <FaRegEnvelope />
                    Mails
                </NavLink>
            </li>
            <li className={styles.navItem}>test 7</li>
            <li className={styles.navItem}>test 8</li>
            <li className={styles.navItem}>test 9</li>
            <li className={styles.navItem}>test 10</li>
        </div>
    );
};

export default AdminNavbar;
