import { Outlet } from 'react-router-dom';
import NutritionTab from '../../../components/admin/nutrition_plans/NutritionTab';

const MitybosPlanaiLayout = () => {
    return (
        <>
            <NutritionTab />
            <Outlet />
        </>
    );
};

export default MitybosPlanaiLayout;