import styles from './PlanCard.module.css';
import { ProfilisIcon, VirtuveIcon } from '../PlanIcons/';
import { usePayment } from '../../../contexts';

const PlanCard = ({ planVariant, plan }) => {
    const { variant, setVariant } = usePayment();
    
    return (
        <div className={`${styles.planCard} ${variant === planVariant ? styles.active : ''}`} onClick={() => setVariant(planVariant)}>
            <div className={styles.cardHeader}>
                {planVariant === 'profilis' && <ProfilisIcon active={variant === planVariant} stroke='1.5' />}
                {planVariant === 'virtuve' && <VirtuveIcon active={variant === planVariant} stroke='1.5' />}

                <span className={styles.planName}>{plan.plan_name_lt}</span>
                <div className={styles.markContainer}>
                    <div className={styles.mark}></div>
                </div>
            </div>

            <div className={styles.cardFooter}>
                <span className={styles.price}>€{plan.price}</span>
                <span className={styles.period}>/ {plan.plan_period}</span>
            </div>
        </div>
    );
};

export default PlanCard;