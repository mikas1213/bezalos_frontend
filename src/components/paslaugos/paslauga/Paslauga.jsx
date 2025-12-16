import styles from './Paslauga.module.css';
import Accordion from './Accordion';
import { usePayment } from '../../../contexts/PaymentProvider';
import { useState, useEffect } from 'react';
import Promotion from './Promotion';
import CountUp from 'react-countup';

const Paslauga = ({ paslauga, setPaslauga }) => {
    
    const { handleServiceCheckout, isLoading } = usePayment();
    const [startPrice, setStartPrice] = useState(paslauga.current_price);
    const [code, setCode] = useState('');
    const [isCodeApproved, setIsCodeApproved] = useState(false);

    useEffect(() => {
        setStartPrice(prevPrice => {
            if (prevPrice !== paslauga.current_price) {
                return prevPrice; 
            }
            return paslauga.current_price;
        });
    }, [paslauga.current_price]);

    return (
        <div className={styles.paslauga}>
            <div className={styles.left}>
                <img 
                    src={paslauga.image_l} 
                    alt={paslauga.title}
                    className={styles.paslaugaImg} 
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
                    {parseFloat(paslauga.discount) > 0 && <span className={styles.wasPrice}>€{paslauga.base_price}</span>}
                </div>
                
                <div className={styles.buyBtn}>
                    {paslauga.is_active && paslauga.quantity > 0 ? 
                        <button disabled={isLoading} onClick={() => handleServiceCheckout(paslauga, code, isCodeApproved)}>Tęsti pirkimą</button>
                        :
                        <button disabled={true}>IŠPARDUOTA</button>
                    }

                    {paslauga.is_active && parseFloat(paslauga.discount) === 0 && paslauga.quantity > 0 && <Promotion
                        code={code}
                        setCode={setCode}
                        paslauga={paslauga}
                        setPaslauga={setPaslauga}
                        startPrice={startPrice}
                        isCodeApproved={isCodeApproved}
                        setIsCodeApproved={setIsCodeApproved}
                    />}

                </div>
                
                {paslauga.quantity < 4 && <span className={styles.quantity}>Liko: {paslauga.quantity} <small>vnt.</small></span>}
                <Accordion paslauga={paslauga} />
            </div>
            
        </div>
    );
};

export default Paslauga;