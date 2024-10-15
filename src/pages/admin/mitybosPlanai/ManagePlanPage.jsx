import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useManagePlan } from '../../../hooks/nutrition_plans_hooks/useManagePlan';
import ManagePlan from '../../../components/admin/nutrition_plans/planai/ManagePlan';
import UserDetails from '../../../components/admin/nutrition_plans/planai/UserDetails';
import Spinner from '../../../components/UI/Spinner';

const ManagePlanPage = () => {
    const params = useParams();
    const [searchUser, setSearchUser] = useState('');
    const { plan, setPlan, isLoading } = useManagePlan(params.id);


    console.log(searchUser)
    // const handlePlanAssign = (edited_plan) => {
    //     console.log(edited_plan)
    // };
    return (
        <div style={{
            display: 'flex',
            marginTop: '1rem',
            gap: '1rem'
        }}>
            {isLoading && <Spinner />}
            {!isLoading && <ManagePlan plan={plan} setPlan={setPlan} />}
            <UserDetails setSearchUser={setSearchUser} />
        </div>
    );
};

export default ManagePlanPage;