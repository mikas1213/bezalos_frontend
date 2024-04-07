import styles from './FooterSection.module.css';
import { Link } from 'react-router-dom';
import Logo from '../../assets/svg/be-zalos-logo.svg';

import { PiFacebookLogo, PiInstagramLogo, PiAt } from "react-icons/pi";

const FooterSection = () => {
    
    return (
        <footer className={`${styles.footerSection} section--hiddenn`}>
            <div className={styles.footerContainer}>
                <div className={styles.subsTitle}>
                    Keliaujam į ilgalaikius pokyčius kartu?
                </div>
                <div className={styles.subsParagraph}>
                    <p>Gauk palaikymą ir mokslu grįstą informaciją, kaip pagaliau pasiekti ilgalaikių rezultatų su meile ir be žalos</p>
                </div>
                <div className={styles.subsEmail}>
                    <div>
                        <input type="email" placeholder='Jūsų el. paštas'/>
                        <button>Prenumeruoti</button>
                    </div>
                </div>
                <div className={styles.footerTop}>
                    <div className={styles.logo}>
                        <img src={Logo} alt='logo' className={styles.logoIcon} onClick={() => window.scrollTo(0, 0)}/>
                    </div>
                    <div className={styles.termsOfUse}>
                        <Link to='/kontaktai'>Kontaktai</Link>
                        <Link to='/taisykles'>Taisyklės</Link>
                        <Link to='/privatumo-politika'>Privatumo politika</Link>
                    </div>
                    <div className={styles.socialIcons}>
                        <Link to='https://www.facebook.com/sandra.jatulyte' target="_blank">
                            <PiFacebookLogo className={styles.icon}/>    
                        </Link>
                        <Link to='https://www.instagram.com/valgau_be_zalos' target="_blank">
                            <PiInstagramLogo className={styles.icon} />
                        </Link>
                       
                        <Link to='mailto:sandra@valgaubezalos.lt'>
                            <PiAt className={styles.icon} />
                        </Link>
                    </div>
                </div>
                <div className={styles.footerDivider}></div>
                <div className={styles.footerBottom}>
                    <span className={styles.copy}>&copy;</span>
                    <span>2024 Valgau be žalos</span>
                </div>
            </div>
        </footer>
    );
};

export default FooterSection;
