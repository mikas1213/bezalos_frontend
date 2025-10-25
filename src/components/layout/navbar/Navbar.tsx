import styles from './Navbar.module.css';
import Modal from '../../UI/Modal';
import Authentication from '../../auth/Authentication';
import { useLocation, NavLink } from 'react-router-dom';
import useNavbar from './hooks/useNavbar';
import { Box, Container, Cluster } from '../../Shared';
import { roles } from '../../../utils/roles';
import Hamburger from './hamburger/Hamburger';
import MobileItems from './mobileitems/MobileItems';
import { useLogout } from '../../../hooks';

import { Logo, AtsijungtiIcon, PaslaugosIcon, PrisijungtiIcon, ProfilisIcon, ReceptaiIcon, VirtuveIcon } from './icons';
import type { NavbarProps } from './types';

export const Navbar = ({ page = 'default' }: NavbarProps) => {
    const logout = useLogout();
    
    const location = useLocation();
    const { isScroll, user_id, user_role, isOpenBurger, setIsOpenBurger, isOpenModal, setIsOpenModal, responsiveNavHeight } = useNavbar(page);
    
    const navBarClasses = [
        styles.nav,
        styles[`${page}_${isScroll ? 'scrolled' : 'at_top'}`]
    ].filter(Boolean).join(' ');

    return (
        <>
            {isOpenModal && <Modal onClose={() => setIsOpenModal(false)}>
                <Authentication />
            </Modal>}

            <Container as='nav' maxWidth='100vw' padding='0' className={navBarClasses}>
                <Container maxWidth='var(--content-width)'>
                    <Cluster className={styles.navDesktop} justify='space-between' align='center' height={responsiveNavHeight}>
                        <NavLink to='/'>
					        <Logo isChangeColor={{ page, isScroll }} />
				        </NavLink>

                        {/* {user_role === roles.admin && (
                            <NavLink to='/admin' className={styles.adminItemMobile}>
                                <span>Admin</span>
                            </NavLink>
                        )} */}

                        <Cluster className={styles.navItems} align='center' gap='clamp(0rem, 3.125vw, 3.2rem)'>
                            <NavLink to='/virtuve' className={styles.listItem}>
                                <span>Virtuvė</span>
                                <div className={styles.indicator}></div>
                            </NavLink>

                            <NavLink to='/receptai' className={styles.listItem}>
                                <span>Receptai</span>
                                <div className={styles.indicator}></div>
                            </NavLink>
                            
                            <NavLink to='/paslaugos' className={styles.listItem}>
                                <span>Paslaugos</span>
                                <div className={styles.indicator}></div>
                            </NavLink>
                            

                            {user_id && (
                                <NavLink to='/profilis' className={styles.listItem}>
                                    <span>Profilis</span>
                                    <div className={styles.indicator}></div>
                                </NavLink>
                            )}
                            
                            {user_role === roles.admin && (
                                <NavLink to='/admin' className={styles.adminItem}>
                                    <span>Admin</span>
                                </NavLink>
                            )}

                            <Box>
                                {!user_id ? (
                                    <button
                                        onClick={() => setIsOpenModal(true)}
                                        className={styles.loginBtn}
                                    >
                                        Prisijungti
                                    </button>
                                ) : (
                                    <button
                                        className={styles.loginBtn}
                                        onClick={async () => await logout()}
                                    >
                                        Atsijungti
                                    </button>
                                )}
                            </Box> 
                        </Cluster>
                        <Hamburger page={page} isScroll={isScroll} isOpenBurger={isOpenBurger} setIsOpenBurger={setIsOpenBurger} />
                    </Cluster>
                </Container>
                        
                <MobileItems isOpenBurger={isOpenBurger}>

                    <NavLink to='/virtuve' className={({isActive}) => isActive ? `${styles.listItemMobile} ${styles.active}` : styles.listItemMobile}>  
                        <VirtuveIcon active={location.pathname.startsWith('/virtuve')} />
                        <span>Virtuvė</span>
                    </NavLink>    
                              
                    <NavLink to='/receptai' className={({isActive}) => isActive ? `${styles.listItemMobile} ${styles.active}` : styles.listItemMobile}>
                        <ReceptaiIcon active={location.pathname.startsWith('/receptai')} />
                        <span>Receptai</span>
                    </NavLink>
            
                    <NavLink to='/paslaugos' className={({isActive}) => isActive ? `${styles.listItemMobile} ${styles.active}` : styles.listItemMobile}>
                        <PaslaugosIcon active={location.pathname.startsWith('/paslaugos')} />
                        <span>Paslaugos</span>
                    </NavLink>
                                                    
                    {user_id && 
                        <NavLink to='/profilis' className={({isActive}) => isActive ? `${styles.listItemMobile} ${styles.active}` : styles.listItemMobile}>
                            <ProfilisIcon active={location.pathname.startsWith('/profilis')} />
                            <span>Profilis</span>
                        </NavLink>
                    }
                                        
                    {!user_id ? 
                        <li 
                            className={`${styles.listItemMobile} ${styles.signout}`}
                            onClick={() => setIsOpenModal(true)}
                        >
                            <PrisijungtiIcon />
                            <span>Prisijungti</span>
                        </li> 
                        :
                        <li className={`${styles.listItemMobile} ${styles.signout}`}
                            onClick={async () => await logout() }
                        >
                            <AtsijungtiIcon />
                            <span>Atsijungti</span>
                        </li>
                    }
                </MobileItems>
            </Container>
        </>
    );
};