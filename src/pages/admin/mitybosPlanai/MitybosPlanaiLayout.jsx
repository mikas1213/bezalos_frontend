// import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { Outlet } from 'react-router-dom';
// import { useEffect } from 'react';
import NutritionTab from '../../../components/admin/nutrition_plans/NutritionTab';

const MitybosPlanaiLayout = () => {
    
    // const axiosPrivate = useAxiosPrivate();
    // useEffect(() => {
    //     const getData = async () => {
    //         try {
    //             await axiosPrivate.get(`/admin/plans`);
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     }
    //     getData();
    // }, []);

    return (
        <>
            <NutritionTab />
            <Outlet />
        </>
    );
};

export default MitybosPlanaiLayout;