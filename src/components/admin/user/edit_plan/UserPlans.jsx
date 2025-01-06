import styles from './UserPlans.module.css';

const UserPlans = ({ plans, selectedPlan, setSelectedPlan }) => {
    
    return(
        <div className={styles.userPlans}>
            {plans.map(plan => <span 
                key={plan.id}
                onClick={() => setSelectedPlan(plan)}
                className={selectedPlan.id === plan.id ? styles.active : ''}
            >
                {plan.title}&nbsp;•&nbsp;<small className={styles.planKcal}>{plan.kcal?.toFixed(0)}</small>&nbsp;kcal
            </span>)}
        </div>
    );
};

export default UserPlans;