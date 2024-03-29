import { useState } from "react";
import { NavLink } from "react-router-dom";

import styles from "./Navbar.module.css";
import { Logo } from "./Logo";

import Modal from '../UI/Modal';
import Authentication from "../auth/Authentication";
import useAuth from "../../hooks/useAuth";
import useLogout from '../../hooks/useLogout';

const Navbar = ({ isHome = false }) => {
    const logout = useLogout();
    
    const [isScroll, setIsScroll] = useState(false);
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
            </nav>
        </>
    );
};

export default Navbar;
