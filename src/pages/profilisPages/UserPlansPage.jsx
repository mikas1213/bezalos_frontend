import { useUserPlans } from '../../hooks/useUserPlans';
import  { useOutletContext } from 'react-router-dom';
import Plans from '../../components/profilis/mitybos_planas/Plans';
// import InformationSoon from '../../components/information_soon/InformationSoon';

const UserPlansPage = () => {
    const { user_id } = useOutletContext();
    const { plans, setPlans, isLoading } = useUserPlans(user_id);
    
    return (
        <div style={{
            marginBottom: '5rem',
            display: 'flex',
            justifyContent: 'center'
        }}>
            {/* {!isLoading && plans.map(plan => <Plan key={plan.id} plan={plan}/>)} */}
            {!isLoading && <Plans  plans={plans} />}
        </div>
        // < InformationSoon/>
    );
};

export default UserPlansPage;