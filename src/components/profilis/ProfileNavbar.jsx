import styles from './ProfileNavbar.module.css';
import { NavLink, useLocation } from 'react-router-dom';
import { BiSolidBowlRice } from 'react-icons/bi';
import { HiClipboardList } from 'react-icons/hi';
import { FaArrowsRotate } from 'react-icons/fa6';
import { FaBook } from 'react-icons/fa';
import { IoMdAnalytics } from 'react-icons/io';
import { RiSettings5Fill } from 'react-icons/ri';
import { FaCalculator } from 'react-icons/fa6';

const ProfileNavbar = () => {
    const location = useLocation();
    const links = [
        {to: '/profilis', label: 'Mitybos planas', icon: <BiSolidBowlRice className={styles.icon} />},
        {to: '/profilis/produktu-keitimas', label: 'Produktų keitimas', icon: <FaArrowsRotate className={styles.icon} />},
        {to: '/profilis/mano-receptai', label: 'Mano receptai', icon: <FaBook className={styles.icon} />},
        {to: '/profilis/kalorijos', label: 'Kalorijos', icon: <FaCalculator className={styles.icon} />},
        {to: '/profilis/statistika', label: 'Statistika', icon: <IoMdAnalytics className={styles.icon} />},
        {to: '/profilis/anketa' , label: 'Anketa', icon: <HiClipboardList className={styles.anketa_icon} />},
        {to: '/profilis/nustatymai', label: 'Nustatymai', icon: <RiSettings5Fill className={styles.icon} />}
    ];

    return (
        <div className={styles.profileNavbar}>
            {links.map(link => 
                <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) => isActive && location.pathname === link.to ? styles.active : ''}
                >{link.icon}{link.label}</NavLink>
            )}
        </div>
    );
};

export default ProfileNavbar;