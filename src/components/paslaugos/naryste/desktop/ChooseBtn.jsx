import styles from './ChooseBtn.module.css';
import usePayments from '../../../../hooks/usePayment';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChooseBtn = () => {
    const { handleSubscriptionCheckout
        // , variant 
    } = usePayments();
    const [sutinku, setSutinku] = useState(false);
    const navigate = useNavigate();

    // const planPreparingText = <span className={styles.sutinkuText}>Narystės planas kuriamas</span>
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

    return (
        <div className={styles.chooseBtnContainer}>
            <div className={styles.checkboxWrapper}>
                <input className={styles.inpCbx} id='sutinku' type='checkbox' onChange={() => setSutinku(su => !su)}/>
                    {/* {variant === 'profilis' ? planPreparingText : agreement} */}
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
                {/* <button onClick={handleSubscriptionCheckout} disabled={!sutinku || variant === 'profilis'}>Prenumeruoti</button> */}
                <button onClick={handleSubscriptionCheckout} disabled={!sutinku}>Prenumeruoti</button>
            </div>
        </div>
    );
};

export default ChooseBtn;
