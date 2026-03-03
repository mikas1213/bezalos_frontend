import { useQuery } from '@tanstack/react-query';
import { axiosPrivate } from '../../api/axios';

const useAdminPromotions = () => {
    const fetchData = async () => {
        try {
            const { data } = await axiosPrivate.get('/admin/promo');
            return data;
        } catch (err) {
            throw new Error(err.message || err.response.data.status || 'Error');
        }
    };

    return useQuery({
        queryKey: ['admin-promo'],
        queryFn: fetchData,
        retry: false,
        staletime: 5 * 60 * 1000
        // refetchOnWindowFocus: false, // išjungiam atnaujinimą grįžtant į langą
        // refetchInterval: false, // išjungiam periodinį atnaujinimą
    });
};

export default useAdminPromotions;