import { useParams } from 'react-router-dom';
import { useManagePlan } from '../../../hooks/nutrition_plans_hooks/useManagePlan';
import ManagePlan from '../../../components/admin/nutrition_plans/planai/ManagePlan';
import Spinner from '../../../components/UI/Spinner';

const ManagePlanPage = () => {
    const params = useParams();
    
    const { plan, setPlan, isLoading } = useManagePlan(params.id);


    // const handlePlanAssign = (edited_plan) => {
    //     console.log(edited_plan)
    // };
    return (
        <div style={{
            display: 'flex',
            marginTop: '1rem',
        }}>
            {isLoading && <Spinner />}
            {!isLoading && <ManagePlan plan={plan} setPlan={setPlan} />}
        </div>
    );
};

export default ManagePlanPage;