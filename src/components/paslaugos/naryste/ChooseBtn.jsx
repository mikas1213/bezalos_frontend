import styles from './ChooseBtn.module.css';
import { usePayment } from '../../../contexts/PaymentProvider';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FaFacebookSquare, FaInstagram } from 'react-icons/fa';

const ChooseBtn = () => {
    const { handleSubscriptionCheckout, variant, isLoading } = usePayment();
    const [sutinku, setSutinku] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const navigate = useNavigate();

    const handlePrenumeruoti = () => {
        // Meta Pixel tracking for subscription initiation
        if (typeof window.fbq === 'function') {
            window.fbq('track', 'InitiateCheckout', {
                content_type: 'subscription',
                content_category: variant || 'general'
            });
        }
        
        if(variant === 'virtuve') {
            setShowConfirmation(true);
        } else {
            handleSubscriptionCheckout();
        }
    };

    const agreement = <> 
        <label className={styles.cbx} htmlFor='sutinku'>
            <span>
                <svg width='12px' height='10px'>
                    <use xlinkHref='#check-4'></use>
                </svg>
            </span>
            <span className={styles.sutinkuText}>Sutinku su pirkimo pardavimo taisyklėmis</span>
        </label>
    </>;

    const Confirmation = () => {
        return (
            <div className={styles.confirmationLayout}>
                <div className={styles.confirmation}>
                    <p className={styles.confirmationHeader} >Priminimas!</p>
                    <p className={styles.confirmationContent}>Norint prisijungti prie merginų bendruomenės būtina susisiekti</p>
                    
                    <div className={styles.confirmBtn}>
                        <div className={styles.social}>
                            <div>
                                <FaFacebookSquare className={styles.socialIcon} />
                                <span>Sandra Jatulytė</span>
                            </div>

                            <div>
                                <FaInstagram className={styles.socialIcon} />
                                <span>Valgau_be_zalos</span>
                            </div>
                        </div>
                        <button onClick={handleSubscriptionCheckout}>Supratau</button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className={styles.chooseBtnContainer}>
            <div className={styles.checkboxWrapper}>
                <input className={styles.inpCbx} id='sutinku' type='checkbox' onChange={() => setSutinku(su => !su)}/>
                    {agreement}
                <svg className={styles.inlineSvg}>
                    <symbol id='check-4' viewBox='0 0 12 10'>
                        <polyline points='1.5 6 4.5 9 10.5 1'></polyline>
                    </symbol>
                </svg> 
                <span className={styles.sutinkuText2}>Įsigijant paslaugą, jūs sutinkate su bezalos.lt&nbsp;
                    <span onClick={() => navigate('/pirkimo-taisykles')} className={styles.taisyklesLink}>Pirkimo pardavimo taisyklėmis</span>.
                </span>
            </div>
            <div>
                {showConfirmation && Confirmation()}
                <button onClick={handlePrenumeruoti} disabled={!sutinku || isLoading}>Prenumeruoti</button>
            </div>
        </div>
    );
};

export default ChooseBtn;
