import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import MainContainer from '../homepage/ui/MainContainer';

import styles from "./Navbar.module.css";
import { Logo } from "./Logo";

import Modal from '../UI/Modal';
import Authentication from "../auth/Authentication";
import useAuth from "../../hooks/useAuth";
import useLogout from '../../hooks/useLogout';

// ICONS
// https://www.svgrepo.com/collection/solar-broken-line-icons
import { VirtuveIcon, ReceptaiIcon, PaslaugosIcon, ProfilisIcon, PrisijungtiIcon, AtsijungtiIcon } from './NavIcons';

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

    const { auth, isOpenModal, setIsOpenModal } = useAuth();
    const iconStroke = 1.5;    
    return (
        <>
            {isOpenModal && <Modal onClose={() => setIsOpenModal(false)}>
                <Authentication />
            </Modal>}
            
            <nav className={`${styles.nav} ${changeStyleClass}`}>
                <MainContainer customClass={styles.navContainer}>
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
                </MainContainer>
                
                <div className={`${styles.navContainerMobile} ${isOpenBurger ? styles.show : ''}`}>
                    <ul className={styles.navListMobile}>

                        <li className={`${styles.listItemMobile} ${location.pathname.indexOf('virtuve') > -1 ? styles.active : ''}`} 
                            onClick={() => navigate('/virtuve')}>  
                            <VirtuveIcon 
                                active={location.pathname.indexOf('virtuve') > -1 ? true : false} 
                                stroke={iconStroke}
                            />
                            <span>Virtuvė</span>
                        </li>
                        
                        <li className={`${styles.listItemMobile} ${location.pathname.indexOf('receptai') > -1 ? styles.active : ''}`} 
                            onClick={() => navigate('/receptai')}>
                            <ReceptaiIcon 
                                active={location.pathname.indexOf('receptai') > -1 ? true : false} 
                                stroke={iconStroke}
                            />
                            <span>Receptai</span>
                        </li>
                        
                        <li className={`${styles.listItemMobile} ${location.pathname.indexOf('paslaugos') > -1 ? styles.active : ''}`}
                            onClick={() => navigate('/paslaugos')}>
                            <PaslaugosIcon 
                                active={location.pathname.indexOf('paslaugos') > -1 ? true : false} 
                                stroke={iconStroke}
                            />
                            <span>Paslaugos</span>
                        </li>
                        

                        {auth?.accessToken && <li className={`${styles.listItemMobile} ${location.pathname.indexOf('profilis') > -1 ? styles.active : ''}`}
                            onClick={() => navigate('/profilis')}>
                            <ProfilisIcon 
                                active={location.pathname.indexOf('profilis') > -1 ? true : false} 
                                stroke={iconStroke}
                            />
                            <span>Profilis</span>
                        </li>}
                        
                            
                        {!auth.accessToken ? <li 
                            className={`${styles.listItemMobile} ${styles.signout}`}
                            onClick={() => setIsOpenModal(true)}>
                            <PrisijungtiIcon stroke={iconStroke} />
                            <span>Prisijungti</span>
                        </li>
                        :
                        <li className={`${styles.listItemMobile} ${styles.signout}`}
                            onClick={async () => await logout()}>
                            <AtsijungtiIcon stroke={iconStroke} />
                            <span>Atsijungti</span>
                        </li>}
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
