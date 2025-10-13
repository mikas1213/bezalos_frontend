import styles from './Naryste.module.css';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../../../hooks';
import { usePayment } from '../../../contexts/PaymentProvider';
import Features from './Features';
import PlanCard from './PlanCard';
import ChooseBtn from './ChooseBtn';
import ManageSubscription from './ManageSubscription';

const Naryste = () => {
    const { plan } = usePayment();
    const { auth } = useAuth();
    
    let loggedUser = {};
    if (auth.accessToken) loggedUser = jwtDecode(auth?.accessToken);
    const { user_s_subscription} = loggedUser;
    
    return (
        <div className={styles.naryste}>
            <Features />
            <div className={styles.plans}>
                <PlanCard  planVariant='profilis' plan={plan.profilis} />
                <PlanCard  planVariant='virtuve' plan={plan.virtuve} />
            </div>
            {!user_s_subscription ? <ChooseBtn key={Math.random()} /> : <ManageSubscription />}
        </div>
    );
};

export default Naryste;
