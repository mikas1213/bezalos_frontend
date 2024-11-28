import { useOutletContext } from 'react-router-dom';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import EditUserPlan from '../../../components/admin/user/edit_plan/EditUserPlan';
import UserPlans from '../../../components/admin/user/edit_plan/UserPlans';
import UserDetails from '../../../components/admin/user/edit_plan/UserDetails';
import toast from 'react-hot-toast';

const EditUserPlanPage = () => {
    const { user, setUser, selectedPlan, setSelectedPlan } = useOutletContext();
    const axiosPrivate = useAxiosPrivate();

    const onPlanUpdate = async (action, actionData) => {
        if(action === 'update-plan-title') {
            setUser(prevState => ({
                ...prevState,
                plans: prevState.plans.map(plan => plan.id === selectedPlan.id ? {
                    ...plan,
                    title: selectedPlan.title
                } : plan)
            }));

        } else if(action === 'delete-plan') {

            setUser(prevUser => {
                if (!prevUser) return null;
                const updatedPlans = prevUser.plans.filter(plan => plan.id !== selectedPlan.id);
                const newSelectedPlan = updatedPlans.length > 0 ? updatedPlans[0] : null;
              
                setSelectedPlan(newSelectedPlan);
              
                return {
                    ...prevUser,
                    plans: updatedPlans,
                };
            });
        }

        try {
            actionData.user_id = user.id;
            await axiosPrivate.patch(`/admin/user/plan/${selectedPlan.id}`, {action, actionData});
        } catch (err) {
            let msgTxt = err.response?.data.message || err.message;
            if(err.status === 401) msgTxt = 'Prisijungti !!!';
            toast.error(msgTxt)
        }
    }

    return (
        <>
            {user.plans.length > 0 && <UserPlans 
                plans={user.plans} 
                selectedPlan={selectedPlan} 
                setSelectedPlan={setSelectedPlan} 
            />}

            <div style={{ display: 'flex', gap: '1rem'}}>
                {user.plans.length > 0 ? <EditUserPlan 
                    plan={selectedPlan} 
                    setPlan={setSelectedPlan} 
                    onPlanUpdate={onPlanUpdate}
                /> :  

                <div style={{
                    textAlign: 'center',
                    marginTop: '5rem',
                    fontSize: '2.5rem',
                    color: '#999'
                }}>Priskirtų planų nėra</div>}

                <UserDetails user={user} />
            </div> 
        </>
    );
};

export default EditUserPlanPage;
