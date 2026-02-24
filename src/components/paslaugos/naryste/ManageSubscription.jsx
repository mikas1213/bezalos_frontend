import styles from './ManageSubscription.module.css';
import { useAxiosPrivate } from '../../../features/auth';

const ManageSubscription = () => {
    const axiosPrivate = useAxiosPrivate();

    const handleCustomerPortal = async () => {
        try {
            const res = await axiosPrivate.post('/payments/customer-portal-session');
            window.location = res.data.session.url;
        } catch {
            // Error opening customer portal
        }
    };

    return (
        <div className={styles.manageSubscriptionContainer}>
            <button onClick={() => handleCustomerPortal()}>
                Tvarkyti narystę
            </button>
        </div>
    );
};

export default ManageSubscription;
