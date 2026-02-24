import { useQuery } from '@tanstack/react-query';
import { useAxiosPrivate } from '../../features/auth';
import toast from 'react-hot-toast';

const useAdminServices = () => {
    const axiosPrivate = useAxiosPrivate();
    const fetchData = async () => {
        
        try {
            const { data: services } = await axiosPrivate.get('/admin/services');
            const data = services.map(service => {
                return {
                    ...service,
                    details: service.details.map((item, i) => ({
                        ...item,
                        id: item.id ?? i
                    }))
                }
            });
            return data;
        } catch (err) {
            toast.error('Paslaugų nerasta');
            throw new Error(err.message || err.response.data.status || 'Error');
        }
    };

    return useQuery({
        queryKey: ['admin-services'],
        queryFn: fetchData,
        staletime: 5 * 60 * 1000
    });
};

export default useAdminServices;