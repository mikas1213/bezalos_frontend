import { useState } from "react";
import { NavLink } from "react-router-dom";

import styles from "./Navbar.module.css";
import { Logo } from "./Logo";

import Modal from '../UI/Modal';
import Authentication from "../auth/Authentication";
import useAuth from "../../hooks/useAuth";
import useLogout from '../../hooks/useLogout';

// import { FaVideo } from "react-icons/fa6";
import { FaPhotoVideo } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa6";
import { FaHeadset } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";

import { FaPowerOff } from "react-icons/fa6";
import { FaArrowRightToBracket } from "react-icons/fa6";

const Navbar = ({ isHome = false }) => {
    const logout = useLogout();
    
    const [isScroll, setIsScroll] = useState(false);
    const [isOpenBurger, setIsOpenBurger] = useState(false);
    const changeColor = () =>
        window.scrollY > 100 ? setIsScroll(true) : setIsScroll(false);
    window.addEventListener("scroll", changeColor);

    let changeStyleClass = "";
    if (isHome && !isScroll) changeStyleClass = styles.navHomeNotScroll;
    if (isHome && isScroll) changeStyleClass = styles.navHomeAndScroll;
    if (!isHome && !isScroll) changeStyleClass = styles.navNotHomeNotScroll;
    if (!isHome && isScroll) changeStyleClass = styles.navNotHomeAndScroll;

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
                        
                            <li className={styles.listItemMobile}>  
                                <FaPhotoVideo className={styles.icon}/>
                                <NavLink to="/virtuve">Virtuvė</NavLink>
                            </li>
                        
                        
                            <li className={styles.listItemMobile}>
                                <FaClipboardList className={styles.icon}/>
                                <NavLink to="/receptai">Receptai</NavLink>
                            </li>
                        
                        
                            <li className={styles.listItemMobile}>
                                <FaHeadset className={styles.icon}/>
                                <NavLink to="/paslaugos">Paslaugos</NavLink>
                            </li>
                        
                        
                            <li className={styles.listItemMobile}>
                                <FaUser className={styles.icon}/>
                                <NavLink to="/profilis">Profilis</NavLink>
                            </li>
                        
                        
                            <li className={`${styles.listItemMobile} ${styles.signout}`}>
                                <FaPowerOff className={styles.icon}/>
                                <a>Atsijungti</a>
                            </li>
                        
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
