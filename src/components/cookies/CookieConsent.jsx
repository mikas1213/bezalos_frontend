import styles from './CookieConsent.module.css';
import { createPortal } from 'react-dom';
import { useState } from 'react';
import cookieImg from '../../assets/icons/png/cookies/cookie.png';

const CookieConsent = ({ setCookie }) => {
    const [show, setShow] = useState(false);
    const giveCookieConsent = () => {
        setShow(s => !s);
        setTimeout(() => {
            setCookie('COOKIE_CONSENT', true, {path: '/'});
        }, 500);
    };

    return createPortal(
        <div className={`${styles.cookieConsentContainer} ${show ? styles.remove : ''}`}>
            <div className={styles.img}>
                <img src={cookieImg} alt='Cookie Logo' />
            </div>
            <div className={styles.content}>
                    <div className={styles.header}>Šioje svetainėje naudojami slapukai</div>
                    <div className={styles.paragraph}>
                        <p>Slapukai padeda užtikrinti patogesnes Jūsų naršymo galimybes. Paspausdami mygtuką &quot;Leisti&quot; jūs sutinkate su slapukų naudojimu. Noredami detaliau susipažinti su slapukų naudojimo politika, galite apsilankyti skiltyje <span className={styles.privatumoPolitikaLink}>&quot;Privatumo politika&quot;</span></p>
                    </div>
            </div>
            <div className={styles.btn}>
                <button onClick={giveCookieConsent}>Leisti</button>
            </div>
        </div>, document.body
    );
};

export default CookieConsent;