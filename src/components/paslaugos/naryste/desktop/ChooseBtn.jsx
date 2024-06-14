import styles from './ChooseBtn.module.css';
import usePayments from '../../../../hooks/usePayment';

const ChooseBtn = () => {
    const { handleSubscriptionCheckout } = usePayments();
    
    return (
        <div className={styles.chooseBtnContainer}>
            <button onClick={handleSubscriptionCheckout}>Rinktis</button>
        </div>
        
    );
};

export default ChooseBtn;