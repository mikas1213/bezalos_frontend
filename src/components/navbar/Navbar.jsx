import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import MainContainer from '../homepage/ui/MainContainer';
import { roles } from '../../utils/roles';
import styles from './Navbar.module.css';
import { Logo } from './Logo';

import Modal from '../UI/Modal';
import Authentication from '../auth/Authentication';
import useAuth from '../../hooks/useAuth';
import useLogout from '../../hooks/useLogout';
        
// ICONS
// https://www.svgrepo.com/collection/solar-broken-line-icons

import { VirtuveIcon, ReceptaiIcon, PaslaugosIcon, ProfilisIcon, PrisijungtiIcon, AtsijungtiIcon } from './NavIcons';

const Navbar = ({ isHome = '' }) => {
    const change_color_nav_height = isHome === 'home' ? 500 : isHome === 'recipes' ? 20 : 100;
    
    const location = useLocation();
    const [_, page] = location.pathname.split('/');
    
    const navigate = useNavigate();
    const logout = useLogout();
    
    const [isScroll, setIsScroll] = useState(false);
    const [isOpenBurger, setIsOpenBurger] = useState(false);
    
    const changeColor = () => {
        window.scrollY > change_color_nav_height ? setIsScroll(true) : setIsScroll(false);
    }
    window.addEventListener('scroll', changeColor);

    let navBarStyle = '';
    if (isHome === 'home' && !isScroll) navBarStyle = styles.navHomeNotScroll;
    if (isHome === 'home' && isScroll) navBarStyle = styles.navHomeAndScroll;
    if (isHome === 'recipes' && !isScroll) navBarStyle = styles.navRecipesNotScroll;
    if (isHome === 'recipes' && isScroll) navBarStyle = styles.navRecipesAndScroll;
    if (!isHome && !isScroll) navBarStyle = styles.navNotHomeNotScroll;
    if (!isHome && isScroll) navBarStyle = styles.navNotHomeAndScroll;
    
    const { loggedUser, isOpenModal, setIsOpenModal } = useAuth();
    const user_id = loggedUser?.user_id || null;
    const user_role = loggedUser?.user_role || null;
    
    const iconStroke = 1.5;    
    return (
        <>
            {isOpenModal && <Modal onClose={() => setIsOpenModal(false)}>
                <Authentication />
            </Modal>}
            
            <nav className={`${styles.nav} ${navBarStyle}`}>
                <MainContainer customClass={styles.navContainer}>
                    <div className={styles.logo}>
                        <NavLink to='/'>
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
                            <NavLink to='/virtuve'>Virtuvė</NavLink>
                            <div className={styles.indicator}></div>
                        </li>

                        <li className={styles.listItem}>

                            <NavLink to='/receptai'>Receptai</NavLink>
                            {/* <NavLink to='https://senas.bezalos.lt/receptai'>Receptai</NavLink> */}
                            <div className={styles.indicator}></div>
                        </li>

                        <li className={styles.listItem}>
                            <NavLink to='/paslaugos'>Paslaugos</NavLink>
                            <div className={styles.indicator}></div>
                        </li>

                        {user_id && <li className={styles.listItem}>
                            <NavLink to='/profilis'>Profilis</NavLink>
                            <div className={styles.indicator}></div>
                        </li>}

                        {user_role === roles.admin && <li className={`${styles.adminItem}`}>
                            <NavLink to='/admin'>Admin</NavLink>
                            <div className={styles.indicator}></div>
                        </li>}
                        
                        <li>
                            {!user_id ? <button
                                onClick={() => setIsOpenModal(true)}
                                className={styles.loginBtn}>
                                Prisijungti
                            </button>
                            :
                            <button className={styles.loginBtn} onClick={async () => await logout()}>Atsijungti</button>
                            }
                        </li>
                        {/* Temporary for old page version */}
                        {/* <div className={styles.senasBezalos}>
                            <a href='https://senas.bezalos.lt'>Sena versija</a>
                        </div> */}
                    </ul>
   
                </MainContainer>
                
                <div className={`${styles.navContainerMobile} ${isOpenBurger ? styles.show : ''}`}>
                    <ul className={styles.navListMobile}>
                        
                        {/* Temporary for old page version */}
                        {/* <li className={`${styles.listItemMobile} ${page === 'sena-versija' ? styles.active : ''}`}>  
                            <a  href='https://senas.bezalos.lt'>
                                <SenasBezalos 
                                    active={page === 'sena-versija' ? true : false} 
                                    stroke={iconStroke}
                                />
                            </a>
                            <a href='https://senas.bezalos.lt'>
                                <span>Sena versija</span>
                            </a>
                        </li> */}

                        <li className={`${styles.listItemMobile} ${page === 'virtuve' ? styles.active : ''}`} 
                            onClick={() => navigate('/virtuve')}>  
                            <VirtuveIcon 
                                active={page === 'virtuve' ? true : false} 
                                stroke={iconStroke}
                            />
                            <span>Virtuvė</span>
                        </li>
                        
                        
                        <li className={`${styles.listItemMobile} ${page === 'receptai' ? styles.active : ''}`} 
                            onClick={() => navigate('/receptai')}
                        >
                            {/* <a href='https://senas.bezalos.lt/receptai' className={styles.listItemMobile}> */}
                                <ReceptaiIcon 
                                    active={page === 'receptai' ? true : false} 
                                    stroke={iconStroke}
                                />
                                <span>Receptai</span>
                            {/* </a> */}
                        </li>
                        
                        <li className={`${styles.listItemMobile} ${page === 'paslaugos' ? styles.active : ''}`}
                            onClick={() => navigate('/paslaugos')}>
                            <PaslaugosIcon 
                                active={page === 'paslaugos' ? true : false} 
                                stroke={iconStroke}
                            />
                            <span>Paslaugos</span>
                        </li>
                        

                        {user_id && <li className={`${styles.listItemMobile} ${page === 'profilis' ? styles.active : ''}`}
                            onClick={() => navigate('/profilis')}>
                            <ProfilisIcon 
                                active={page === 'profilis'? true : false} 
                                stroke={iconStroke}
                            />
                            <span>Profilis</span>
                        </li>}
                        
                            
                        {!user_id ? <li 
                            className={`${styles.listItemMobile} ${styles.signout}`}
                            onClick={() => setIsOpenModal(true)}>
                            <PrisijungtiIcon stroke={iconStroke} />
                            <span>Prisijungti</span>
                        </li>
                        :
                        <li className={`${styles.listItemMobile} ${styles.signout}`}
                            onClick={async () => await logout() }>
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
