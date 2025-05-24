import { useQuery } from '@tanstack/react-query';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const fetchData = async (axiosPrivate) => {
    try {
        const { data } = await axiosPrivate.get('/admin/videos');
        return data;
    } catch (err) {
        throw new Error(err.message || err.response.data.status || 'Error');   
    }
};

const useVideosAdmin = () => {
    const axiosPrivate = useAxiosPrivate();

    return useQuery({
        queryKey: ['admin-videos'],
        queryFn: () => fetchData(axiosPrivate),
        staletime: 5 * 60 * 1000,
        retry: false,
    });
};

export default useVideosAdmin;