import styles from './FooterSection.module.css';

import { useState } from 'react';
import { FaRegArrowAltCircleUp, FaArrowAltCircleUp, /*FaHeart,*/ FaFacebook, FaInstagram, FaEnvelope } from "react-icons/fa";
// import { BiHeartCircle } from "react-icons/bi";

const FooterSection = () => {

    const [isHover, setIsHovered] = useState(false);
    
    return (
        <footer className={`${styles.footerSection} section--hiddenn`}>
            <div className={styles.footerContainer}>
                <div className={styles.footerTop}>
                    <div className={styles.newsLetter}>
                        <div className={styles.newsLetterTitle}>
                            <p>Nori sužinoto daugiau apie</p>
                            <p>Valgau Be Žalos</p>
                        </div>
                        <div className={styles.inputGroup}>
                            <input type="text" placeholder='Tavo emailas'/>
                            <div 
                                className={styles.iconContainer}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                            >
                                {isHover ? 
                                    <FaArrowAltCircleUp className={styles.icon} /> : 
                                    <FaRegArrowAltCircleUp className={styles.icon} 
                                />}
                                {/* <FaHeart className={styles.iconHeart}/> */}
                            </div>
                        </div>
                    </div>
                    <div className={styles.social}>
                        <FaFacebook className={styles.icon} />
                        <FaInstagram className={styles.icon} />
                        <FaEnvelope className={styles.icon} />
                    </div>
                </div>
                <div className={styles.footerDivider}></div>
                <div className={styles.footerBottom}>
                    <span>&copy;</span> 2024 Valgau Be Žalos
                </div>
            </div>
        </footer>
    );
};

export default FooterSection;
