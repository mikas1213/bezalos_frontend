import styles from './Footer.module.css';
import Logo from '../../assets/icons/svg/be-zalos-logo.svg';
import { PiFacebookLogo, PiInstagramLogo, PiAt } from 'react-icons/pi';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.footerTop}>
                <div className={styles.footerLogo}>
                    <img src={Logo} alt='logo' className={styles.logoIcon} />
                </div>
                <div className={styles.termsOfUse}>
                    <Link to='#'>Kontaktai</Link>
                    <Link to='/pirkimo-taisykles'>Pirkimo taisyklės</Link>
                    <Link to='#'>Privatumo politika</Link>
                </div>
                <div className={styles.socialIcons}>
                    <Link to='https://www.facebook.com/sandra.jatulyte' target='_blank'>
                        <PiFacebookLogo className={styles.icon}/>    
                    </Link>
                    <Link to='https://www.instagram.com/valgau_be_zalos' target='_blank'>
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
                <span>2024 Be žalos</span>
            </div>
        </div>
    );
};

export default Footer;