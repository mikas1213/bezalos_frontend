import { useUserPlans } from '../../hooks/useUserPlans';
import  { useOutletContext } from 'react-router-dom';
import Plans from '../../components/profilis/mitybos_planas/Plans';
import No_Plans from '../../components/profilis/no_mitybos_planas/No_Plans';

const UserPlansPage = () => {
    const { user_id, is_subscription } = useOutletContext();
    const { plans, isLoading } = useUserPlans(user_id);
    
    return (
        <>
            <div style={{
                marginBottom: '3rem',
                display: 'flex',
                justifyContent: 'center'
            }}>

                {isLoading ? null : (
                    plans.length > 0 
                        ? <Plans plans={plans} is_subscription={is_subscription} />
                        : <No_Plans />)
                }
                                
            </div>
            <div style={{color: 'var(--color-bgr-top)', marginBottom: '0.5rem', textAlign: 'center'}}>Be žalos | bezalos.lt</div>
        </>
    );
};

export default UserPlansPage;