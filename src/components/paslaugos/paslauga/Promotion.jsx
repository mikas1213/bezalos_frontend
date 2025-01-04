import styles from './Promotion.module.css';
import { useState } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import SpinnerBtn from './SpinnerBtn';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';

import { useNavigate } from 'react-router-dom';

const Promotion = ({ code, setCode, paslauga, setPaslauga, startPrice, isCodeApproved, setIsCodeApproved }) => {
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const [discountAmount, setDiscountAmount] = useState(0);
    const [isUserTyped, setIsUserTyped] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const validatePromotionCode = async code => {
        if(isCodeApproved) {
            console.log('Norėtum 🤣');
            return;
        }
        try {
            setIsLoading(true);
            const { data: {new_price, discount_amount} } = await axiosPrivate.post(`/discount/apply/${code}`, {service_id: paslauga.id, service_price: Number(paslauga.current_price)});
                
            setPaslauga(prev => ({...prev, current_price: new_price}));
            setDiscountAmount(discount_amount);
            setIsLoading(false);
            setIsUserTyped(false);
            setIsCodeApproved(true);
        } catch (err) {
            
            if(err.status === 401 || err.status === 403) {
                navigate('/prisijungti');
            }
            setError(err.response.data.message);
            setIsLoading(false);
            setIsCodeApproved(false);
        } 
    };

    return (
        <div className={styles.promotionCodeContainer}>
            {!isCodeApproved ? <input 
                type='text' 
                value={code}
                onChange={e => {
                    setCode(e.target.value?.toUpperCase()); 
                    setIsUserTyped(true);
                    setError('');
                }}
                className={`${styles.discountCode} ${code?.length > 0 ? styles.show : ''}`} 
                placeholder='Pridėti nuolaidos kodą' 
            /> : <div className={styles.approvedCode}>
                    <div className={styles.code}>
                        <span>{code.toUpperCase()}</span>
                        <span onClick={() => {
                            setIsCodeApproved(false);
                            setPaslauga(prev => ({...prev, current_price: startPrice}));
                                document.querySelector(`.${styles.applyCode}`).classList.add(styles.showApplyCode)
                            }}>
                            <IoIosCloseCircleOutline className={styles.closeIcon} />    
                        </span>
                    </div>
                    <span className={styles.discountValue}>-€{discountAmount}.00</span>
                </div>
            }

            {!isLoading ? <span 
                onClick={() => validatePromotionCode(code)}
                className={`
                    ${styles.applyCode} 
                    ${
                        code.length > 0 && isUserTyped && error.length === 0 ? 
                        styles.showApplyCode : 
                        code.length === 0 && isUserTyped ? styles.hideApplyCode : ''
                    }`}
                >Taikyti</span> : <SpinnerBtn />}
            {error && <span className={styles.promotionError}>{error}</span>}
        </div>
    );
};

export default Promotion;