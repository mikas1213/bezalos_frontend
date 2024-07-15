import styles from "./ChooseBtn.module.css";
import usePayments from "../../../../hooks/usePayment";

import { useState } from "react";

const ChooseBtn = () => {
    const { handleSubscriptionCheckout, variant } = usePayments();
    const [sutinku, setSutinku] = useState(false);
    
    const planPreparingText =<span className={styles.sutinkuText}>Narystės planas kuriamas</span>
    const agreement = <> 
        <label className={styles.cbx} htmlFor='sutinku'>
            <span>
                <svg width='12px' height='10px'>
                    <use xlinkHref='#check-4'></use>
                </svg>
            </span>
            <span className={styles.sutinkuText}>Sutinku su pirkimo pardavimo sąlygomis</span>
        </label>
    </>;

    return (
        <div className={styles.chooseBtnContainer}>
            <div className={styles.checkboxWrapper}>
                <input className={styles.inpCbx} id='sutinku' type='checkbox' onChange={() => setSutinku(su => !su)}/>
                {/* <label className={styles.cbx} htmlFor='sutinku'> */}
                    {variant === 'profilis' ? planPreparingText : agreement}
                    {/* <span>
                        <svg width='12px' height='10px'>
                            <use xlinkHref='#check-4'></use>
                        </svg>
                    </span> */}
                    {/* <span className={styles.sutinkuText}>Sutinku su pirkimo pardavimo sąlygomis</span> */}
                {/* </label> */}
                <svg className={styles.inlineSvg}>
                    <symbol id='check-4' viewBox='0 0 12 10'>
                        <polyline points='1.5 6 4.5 9 10.5 1'></polyline>
                    </symbol>
                </svg> 
            </div>
            <button onClick={handleSubscriptionCheckout} disabled={!sutinku || variant === 'profilis'}>Prenumeruoti</button>
        </div>
    );
};

export default ChooseBtn;
