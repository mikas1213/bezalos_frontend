import styles from './PaslaugosContainer.module.css';
import { axiosPrivate } from '../../api/axios';

const PaslaugosContainer = ({ children }) => {

    const handleCustomerPortal = async () => {
        
        try {
            const res = await axiosPrivate.post('/payments/customer-portal-session');
            window.location = res.data.session.url;
        } catch (err) {
            console.log(err.message)
        }
    };

    return <div className={styles.paslaugosContainer}>
        <div>
            <h3>Test Customer Portal</h3>
            <button onClick={() => handleCustomerPortal()}>Tvarkyti narystę</button>
        </div>
        {children}
    </div>;
    
};

export default PaslaugosContainer;