import { Outlet, useOutletContext } from 'react-router-dom';
import NutritionTab from '../../../components/admin/nutrition_plans/NutritionTab';

const MitybosPlanaiLayout = () => {
    const {isLoading, stats, setStats} = useOutletContext();
    return (
        <>
            <NutritionTab isLoading={isLoading} stats={stats} />
            <Outlet context={{ setStats }} />
        </>
    );
};

export default MitybosPlanaiLayout;