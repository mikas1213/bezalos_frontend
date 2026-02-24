import styles from './Naryste.module.css';
import { useAuth } from '../../../features/auth';
import { usePayment } from '../../../contexts/PaymentProvider';
import Features from './Features';
import PlanCard from './PlanCard';
import ChooseBtn from './ChooseBtn';
import ManageSubscription from './ManageSubscription';
import { Center } from '../../Shared';
const Naryste = () => {
    const { plan } = usePayment();
    const { user } = useAuth();
    const user_s_subscription = user?.user_s_subscription;
    
    return (
        <>
        <Center className={styles.narysteTitle}>Rinktis narystės planą</Center>
        <div className={styles.naryste}>
            <Features />
            <div className={styles.plans}>
                <PlanCard  planVariant='profilis' plan={plan.profilis} />
                <PlanCard  planVariant='virtuve' plan={plan.virtuve} />
            </div>
            {!user_s_subscription ? <ChooseBtn key={Math.random()} /> : <ManageSubscription />}
        </div>
        </>
    );
};

export default Naryste;
