import styles from './Paslauga.module.css';
import { getImageURL } from '../../../utils/images';
import Accordion from './Accordion';
import usePayment from '../../../hooks/usePayment';
import { useState, useEffect } from 'react';
import SpinnerBtn from './SpinnerBtn';
import CountUp from 'react-countup';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { IoIosCloseCircleOutline } from 'react-icons/io';

const Paslauga = ({ paslauga, setPaslauga }) => {

    const { handleServiceCheckout, isLoading } = usePayment();
    const [code, setCode] = useState('');
    const [isUserTyped, setIsUserTyped] = useState(false);
    const [startPrice, setStartPrice] = useState(paslauga.current_price);
    const [error, setError] = useState('');
    const [isLoadingCheckCode, setIsLoadingCheckCode] = useState(false);
    const [isCodeApprove, setIsCodeApprove] = useState(false);
    const axiosPrivate = useAxiosPrivate();
    
    useEffect(() => {
        setStartPrice(prevPrice => {
            if (prevPrice !== paslauga.current_price) {
                return prevPrice; 
            }
            return paslauga.current_price;
        });
    }, [paslauga.current_price]);

    const validatePromotionCode = async code => {
        
        try {
            setIsLoadingCheckCode(true);
            const { data: discount } = await axiosPrivate.post(`/discount/apply/${code}`);
            // console.log('discount: ', discount)
            setPaslauga(prev => ({...prev, current_price: '84.00'}));
            setIsLoadingCheckCode(false);
            setIsUserTyped(false);
            setIsCodeApprove(true);
        } catch (err) {
            setError(err.response.data.message);
            setIsLoadingCheckCode(false);
        } 
    }; 

    return (
        <div className={styles.paslauga}>
            <div className={styles.left}>
                <img 
                    src={getImageURL(`paslaugos/${paslauga.slug}.webp`)} 
                    alt={paslauga.title}
                    className={`${styles.paslaugaImg} ${paslauga.slug === 'kursas-iveik-emocini-valgyma' ? styles.spcificSizeImg : ''}`} 
                />
            </div>

            <div className={styles.right}>
                <div className={styles.paslaugaTitle}>
                    {paslauga.title}
                </div>

                <div className={styles.paslaugaDesc}>
                    {paslauga.basic_desc}
                </div>

                <div className={styles.price}>
                    €<CountUp
                        key={paslauga.current_price}  
                        start={parseFloat(startPrice)}
                        end={parseFloat(paslauga.current_price)}
                        decimals={2}
                        duration={0.5}
                        separator=''
                    />
                    {paslauga.discount > 0 && <span className={styles.wasPrice}>€{paslauga.base_price}</span>}
                </div>
                
                <div className={styles.buyBtn}>
                    {paslauga.quantity > 0 ? 
                        <button disabled={isLoading} onClick={() => handleServiceCheckout(paslauga)}>Tęsti pirkimą</button>
                        :
                        <button disabled={true}>IŠPARDUOTA</button>
                    }

                    {/* <div className={styles.promotionCodeContainer}>
                        {!isCodeApprove ? <input 
                            type='text' 
                            value={code}
                            onChange={e => {
                                setCode(e.target.value); 
                                setIsUserTyped(true);
                                setError('');
                            }}
                            className={`${styles.discountCode} ${code.length > 0 ? styles.show : ''}`} 
                            placeholder='Pridėti nuolaidos kodą' 
                        /> : <div className={styles.approvedCode}>
                                <div className={styles.code}>
                                    <span>{code.toUpperCase()}</span>
                                    <span onClick={() => {
                                        setIsCodeApprove(false);
                                        setPaslauga(prev => ({...prev, current_price: startPrice}));
                                        document.querySelector(`.${styles.applyCode}`).classList.add(styles.showApplyCode)
                                    }}>
                                        <IoIosCloseCircleOutline className={styles.closeIcon} />    
                                    </span>

                                </div>
                                <span className={styles.discountValue}>-€{startPrice - paslauga.current_price}.00</span>
                            </div>
                        }

                        {!isLoadingCheckCode ? <span 
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
                    </div> */}

                </div>
                
                {paslauga.quantity < 4 && <span className={styles.quantity}>Liko: {paslauga.quantity} <small>vnt.</small></span>}
                <Accordion paslauga={paslauga} />
            </div>
        </div>
    );
};

export default Paslauga;