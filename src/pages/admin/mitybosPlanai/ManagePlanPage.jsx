import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useManagePlan } from '../../../hooks/nutrition_plans_hooks/useManagePlan';
import ManagePlan from '../../../components/admin/nutrition_plans/planai/ManagePlan';
import UserDetails from '../../../components/admin/nutrition_plans/planai/UserDetails';
import Spinner from '../../../components/UI/Spinner';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import toast from 'react-hot-toast';

const ManagePlanPage = () => {
    const params = useParams();
    const axiosPrivate = useAxiosPrivate();
    const [user, setUser] = useState({label: 'Paieška...', value: ''});
    const { plan, setPlan, isLoading } = useManagePlan(params.id);

    const handleSumbit = async () => {
        try {
            if(!user.value) throw new Error('Nepasirinktas klientas!');
            await axiosPrivate.post(`/admin/plans/assign`, {user_id: user.value, plan});

        } catch (err) {
            throw new Error(err.response?.data.message || err.message);
        }
    };
    
    const assignPlanToUser = () => {
        const id = Date.now();
        toast.promise(handleSumbit(), {
                loading: 'Priskiriama...',
                success: () => <OnAssignPlanToast id={id} name={user.stripe_username || user.name} email={user.email} />, 
                error: (err) => <OnAssignPlanToast id={id} name='Klaida! ' email={err.message} />,
            }, 
            {
                id,
                success: {
                    // icon: '😤🤯😳',
                    duration: Infinity,
                    style: {
                        paddingLeft: '1rem'
                    }
                },
                error: {
                    // icon: '',
                    duration: Infinity,
                    style: {
                        paddingLeft: '1rem',
                        fontWeight: 600,
                        color: 'black'
                    }
                }
            }
        );
    };

    return (
        <div style={{
            display: 'flex',
            marginTop: '1rem',
            gap: '1rem'
        }}>
            {isLoading && <Spinner />}
            {!isLoading && <ManagePlan plan={plan} setPlan={setPlan} />}
            <UserDetails setUser={setUser} user={user} assignPlanToUser={assignPlanToUser}  />
            
        </div>
    );
};

const OnAssignPlanToast = ({id, name, email}) => {
    return (
        <div style={{display: 'flex', flexDirection: 'row'}}>
            <div style={{
                        display: 'flex', 
                        flexDirection: 'column', 
                        borderRight: '0.5px solid #ccc', 
                        paddingRight: '1rem', 
                        paddingLeft: '0.3rem',
                        color: 'var(--color-bgr-top)'
            }}>
                <span style={{fontSize: '0.8rem', color: '#ccc'}}>{name}</span>
                <span style={{fontWeight: 600}}>{email}</span>
            </div>
            <div style={{display: 'flex', paddingLeft: '1rem'}}>
                <button 
                    style={{
                        border: 'none', 
                        backgroundColor: 'transparent', 
                        textDecoration: 'underline', 
                        color: 'var(--color-bgr-top)',
                        fontSize: '1.2rem', 
                        fontWeight: 600
                    }}
                    onClick={() => toast.dismiss(id)}
                >OK!</button>   
            </div>        
        </div>
    );
};

export default ManagePlanPage;