import { useQuery } from '@tanstack/react-query';
import axios from '../../api/axios';

const fetchData = async () => {
    try {
        const { data } = await axios.get('/services');
        return data;
    } catch (err) {
        throw new Error(err.message || err.response.data.status || 'Error');   
    }
};

const usePaslaugos = () => {
    return useQuery({
        queryKey: ['services'],
        queryFn: fetchData,
        staletime: 5 * 60 * 1000,
        retry: false,
    });
};

export default usePaslaugos;