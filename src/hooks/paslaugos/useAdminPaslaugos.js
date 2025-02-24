import { useQuery } from '@tanstack/react-query';
import useAxiosPrivate from '../useAxiosPrivate';

const useAdminPaslaugos = () => {
    const axiosPrivate = useAxiosPrivate();
    const fetchData = async () => {
        
        try {
            const { data: test } = await axiosPrivate.get('/admin/services');
            const data = test.map(service => {
                return {
                    ...service,
                    details: service.details.map((item, i) => ({
                        ...item,
                        id: item.id ?? i
                    }))
                }
            })
            console.log(data)
            return data;
        } catch (err) {
            throw new Error(err.message || err.response.data.status || 'Error');
        }
    };

    return useQuery({
        queryKey: ['admin-services'],
        queryFn: fetchData,
        staletime: 5 * 60 * 1000
    });
};

export default useAdminPaslaugos;