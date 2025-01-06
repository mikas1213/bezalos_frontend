import styles from './ProfileNavbar.module.css';
import { useState, useEffect, useRef } from 'react';

import { NavLink, useLocation } from 'react-router-dom';
import { BiSolidBowlRice } from 'react-icons/bi';
import { HiClipboardList } from 'react-icons/hi';
import { FaArrowsRotate, FaCalculator } from 'react-icons/fa6';
import { FaBook } from 'react-icons/fa';
import { IoMdAnalytics } from 'react-icons/io';
import { RiSettings5Fill } from 'react-icons/ri';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ProfileNavbar = () => {
    const location = useLocation();
    const links = [
        {to: '/profilis', label: 'Mitybos planas', icon: <BiSolidBowlRice className={styles.icon} />},
        {to: '/profilis/produktu-keitimas', label: 'Produktų keitimas', icon: <FaArrowsRotate className={styles.icon} />},
        {to: '/profilis/mano-receptai', label: 'Mano receptai', icon: <FaBook className={styles.icon} />},
        {to: '/profilis/kalorijos', label: 'Kalorijos', icon: <FaCalculator className={styles.icon} />},
        {to: '/profilis/statistika', label: 'Statistika', icon: <IoMdAnalytics className={styles.icon} />},
        {to: '/profilis/anketa' , label: 'Anketa', icon: <HiClipboardList className={styles.anketa_icon} />},
        {to: '/profilis/nustatymai', label: 'Nustatymai', icon: <RiSettings5Fill className={styles.icon} />},
    ];

    const navRef = useRef(null);
    const [scrollInfo, setScrollInfo] = useState({
        isScrollStart: true,
        isScrollEnd: false
    });
    const handleScroll = () => {
        if (navRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = navRef.current;

            setScrollInfo({
                isScrollStart: Math.round(scrollLeft) <= 0,
                isScrollEnd: Math.floor(scrollWidth - scrollLeft - clientWidth) <= 0
            });
        }   
    }

    const scrollBy = (pixels) => {
        
        navRef.current?.scrollBy({
          left: pixels,
          behavior: 'smooth'
        });
    };
      
    useEffect(() => {
        const container = navRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
            handleScroll();        
            return () => container.removeEventListener('scroll', handleScroll);
        }
    }, []);

    return (
        <div className={styles.profileNavContainer}>
            <div className={`${styles.leftArrow} ${scrollInfo.isScrollStart ? '' : styles.showArrow}`}>
                <div className={styles.arrowBtn} onClick={() => scrollBy(-200)}>
                    <ChevronLeft className={styles.chevronIcon} /> 
                </div>
            </div>

            <div ref={navRef} className={styles.profileNavbar}>
                {links.map(link => 
                    <NavLink
                        key={link.to}
                        to={link.to}
                        className={({ isActive }) => isActive && location.pathname === link.to ? styles.active : ''}
                    >{link.icon}{link.label}</NavLink>
                )}    
            </div>

            <div className={`${styles.rightArrow} ${scrollInfo.isScrollEnd ? '' : styles.showArrow}`}>
                <div className={styles.arrowBtn} onClick={() => scrollBy(200)}>
                    <ChevronRight className={styles.chevronIcon} /> 
                </div>
            </div>
        </div>
    );
};

export default ProfileNavbar;