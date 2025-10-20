import styles from './FooterSmall.module.css';
import { Link } from 'react-router-dom';
import { Cluster } from '../../../Shared';
import Logo from '../../../../assets/icons/svg/be-zalos-logo.svg';
import { PiFacebookLogo, PiInstagramLogo, PiAt } from 'react-icons/pi';
import { useMediaQuery } from '../../../../contexts/MediaQueryProvider';

export const FooterSmall = () => {
    const mediaQuery = useMediaQuery();
    
    return (
        <>
            <Cluster justify='space-between' align='flex-end' className={styles.footerTop}>
                <Cluster justify='flex-end' className={styles.footerLogo}>
                    <img src={Logo} alt='logo' onClick={() => window.scrollTo(0, 0)}/>
                </Cluster>
                <Cluster justify='space-around' className={styles.termsOfUse}>
                    <Link to='/kontaktai'>Kontaktai</Link>
                    <Link to='/pirkimo-taisykles'>Pirkimo taisyklės</Link>
                    <Link to='/privatumo-politika'>Privatumo politika</Link>
                </Cluster>
                <Cluster gap='0.6rem' justify={mediaQuery < 577 ? 'flex-end' : 'flex-start'} className={styles.socialIcons}>
                    <Link to='https://www.facebook.com/sandra.jatulyte' target='_blank'>
                        <PiFacebookLogo className={styles.icon}/>    
                    </Link>
                    <Link to='https://www.instagram.com/valgau_be_zalos' target='_blank'>
                        <PiInstagramLogo className={styles.icon} />
                    </Link>                       
                    <Link to='mailto:sandra@valgaubezalos.lt'>
                        <PiAt className={styles.icon} />
                    </Link>
                </Cluster>
            </Cluster>

            <div className={styles.footerDivider}></div>
            <Cluster align='center' gap='0.3rem' justify={mediaQuery < 577 ? 'center' : 'flex-start'} className={styles.footerBottom}>
                <span className={styles.copy}>&copy;</span>
                <span>2025 Be žalos</span>
            </Cluster>
        </>
    )
}