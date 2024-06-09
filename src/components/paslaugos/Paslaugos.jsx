import styles from './Paslaugos.module.css';
import { axiosPrivate } from '../../api/axios';

const Paslaugos = ({ children }) => {

    const handleCustomerPortal = async () => {
        
        try {
            const res = await axiosPrivate.post('/payments/customer-portal-session');
            window.location = res.data.session.url;
        } catch (err) {
            console.log(err.message)
        }
    };

    return (
        <div className={styles.paslaugosContainer}>
            <div className={styles.paslaugos}>
                {children}
            </div>

            <div className={styles.customerPortal}>
                {/* <span className={styles.customerPortalBtn}> */}
                <button onClick={() => handleCustomerPortal()}>Customer Portal</button>
                    {/* <a href="https://billing.stripe.com/p/login/6oE150ggf1WJ4Qo3cc">Tvarkyti narystę</a> */}
                {/* </span> */}
            </div> 
        </div>
    );
};

export default Paslaugos;