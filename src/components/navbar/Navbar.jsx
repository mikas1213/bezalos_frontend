import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import styles from "./Navbar.module.css";
import { Logo } from "./Logo";

import Modal from '../UI/Modal';
import Authentication from "../auth/Authentication";
import useAuth from "../../hooks/useAuth";
import useLogout from '../../hooks/useLogout';

import { FaPhotoVideo } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa6";
import { FaHeadset } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";
import { FaPowerOff } from "react-icons/fa6";
import { FaArrowRightToBracket } from "react-icons/fa6";

const Navbar = ({ isHome = false }) => {

    const location = useLocation();
    const navigate = useNavigate();
    const logout = useLogout();
    
    const [isScroll, setIsScroll] = useState(false);
    const [isOpenBurger, setIsOpenBurger] = useState(false);
    const changeColor = () =>
        window.scrollY > 100 ? setIsScroll(true) : setIsScroll(false);
    window.addEventListener('scroll', changeColor);

    let changeStyleClass = '';
    if (isHome && !isScroll) changeStyleClass = styles.navHomeNotScroll;
    if (isHome && isScroll) changeStyleClass = styles.navHomeAndScroll;
    if (!isHome && !isScroll) changeStyleClass = styles.navNotHomeNotScroll;
    if (!isHome && isScroll) changeStyleClass = styles.navNotHomeAndScroll;
   
    // if (isHome && !isScroll) document.body.style.backgroundColor = '#084747';
    
    // useEffect(() => {
        // if(isHome && !isScroll) {
            // document.getElementById('body').style.transition = "all 0.3s";
            // document.body.style.backgroundColor = '#084747';
        // } else {
            // document.getElementById('body').style.transition = "all 0.3s";
            // document.body.style.backgroundColor = '#eff1ef';
        // }
        // return () => {
        //     document.getElementById('body').style.transition = "all 0.3s";
        //     document.body.style.backgroundColor = '#084747';
        // }
    // }, [isHome, isScroll]);
    

    const { auth, isOpenModal, setIsOpenModal } = useAuth();
    
    return (
        <>
            {isOpenModal && <Modal onClose={() => setIsOpenModal(false)}>
                <Authentication />
            </Modal>}
            
            <nav className={`${styles.nav} ${changeStyleClass}`}>
                <div className={styles.navContainer}>
                    <div className={styles.logo}>
                        <NavLink to="/">
                            <Logo isChangeColor={{ isHome, isScroll }} />
                        </NavLink>
                    </div>
                    <div className={`${styles.hamburger} ${isOpenBurger ? styles.openBurger : ''}`} onClick={() => setIsOpenBurger(on => !on)}>
                        <div className={styles.burgerTop}></div>
                        <div className={styles.burgerMiddle}></div>
                        <div className={styles.burgerBottom}></div>
                    </div>
                    
                    <ul className={styles.navList}>
                        <li className={styles.listItem}>
                            <NavLink to="/virtuve">Virtuvė</NavLink>
                            <div className={styles.indicator}></div>
                        </li>

                        <li className={styles.listItem}>
                            <NavLink to="/receptai">Receptai</NavLink>
                            <div className={styles.indicator}></div>
                        </li>

                        <li className={styles.listItem}>
                            <NavLink to="/paslaugos">Paslaugos</NavLink>
                            <div className={styles.indicator}></div>
                        </li>

                        {auth?.accessToken && <li className={styles.listItem}>
                            <NavLink to="/profilis" >Profils</NavLink>
                            <div className={styles.indicator}></div>
                        </li>}
                        
                        <li>
                            {!auth.accessToken ? <button
                                onClick={() => setIsOpenModal(true)}
                                className={styles.loginBtn}>
                                Prisijungti
                            </button>
                            :
                            <button className={styles.loginBtn} onClick={async () => await logout()}>Atsijungti</button>
                            }
                        </li>
                    </ul>
                </div>

                <div className={`${styles.navContainerMobile} ${isOpenBurger ? styles.show : ''}`}>
                    <ul className={styles.navListMobile}>

                        <li className={`${styles.listItemMobile} ${location.pathname.indexOf('virtuve') > -1 ? styles.active : ''}`} 
                            onClick={() => navigate('/virtuve')}>  
                            <FaPhotoVideo className={styles.icon}/>
                            <span>Virtuvė</span>
                        </li>
                        
                        
                        <li className={`${styles.listItemMobile} ${location.pathname.indexOf('receptai') > -1 ? styles.active : ''}`} 
                            onClick={() => navigate('/receptai')}>
                            <FaClipboardList className={styles.icon}/>
                            <span>Receptai</span>
                        </li>
                        
                        
                        <li className={`${styles.listItemMobile} ${location.pathname.indexOf('paslaugos') > -1 ? styles.active : ''}`}
                            onClick={() => navigate('/paslaugos')}>
                            <FaHeadset className={styles.icon}/>
                            <span>Paslaugos</span>
                        </li>
                        

                        {auth?.accessToken && <li className={`${styles.listItemMobile} ${location.pathname.indexOf('profilis') > -1 ? styles.active : ''}`}
                            onClick={() => navigate('/profilis')}>
                            <FaUser className={styles.icon}/>
                            <span>Profilis</span>
                        </li>}
                        
                            
                        {!auth.accessToken ? <li 
                            className={`${styles.listItemMobile} ${styles.signout}`}
                            onClick={() => setIsOpenModal(true)}>
                            <FaArrowRightToBracket className={styles.icon}/>
                            <span>Prisijungti</span>
                        </li>
                        :
                        <li className={`${styles.listItemMobile} ${styles.signout}`}
                            onClick={async () => await logout()}>
                            <FaPowerOff className={styles.icon}/>
                            <span>Atsijungti</span>
                        </li>}
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
