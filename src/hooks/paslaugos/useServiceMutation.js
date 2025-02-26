import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosPrivate from '../useAxiosPrivate';
import toast from 'react-hot-toast';

const useServiceMutation = () => {
    const axiosPrivate = useAxiosPrivate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, api, formData, action }) => {
            
            const config = { headers: { 'Content-Type': 'multipart/form-data' } };
            return action === 'insert'
                ? axiosPrivate.post(`/admin/${api}/add`, formData, config)
                : axiosPrivate.patch(`/admin/${api}/${id}`, formData, config);
        },
        onSuccess: (_, variables) => {
                // const msg_inserted = variables.api === 'services' ? 'Paslauga pridėta' : 'Kodas pridėtas'
                // const msg_updated
            queryClient.invalidateQueries({ queryKey: ['admin-services'] });
            toast.success(variables.action === 'insert' ? `${variables.api === 'services' ? 'Paslauga pridėta' : 'Kodas pridėtas'}` : 'Paslauga atnaujinta');
            variables.onCloseModal();
        },
        onError: (err, variables) => {
            toast.error(err.response?.data?.message || err.message || `Klaida ${variables.action === 'insert' ? 'pridedant' : 'atnaujinant'} paslaugą`);
        }
    });
};

export default useServiceMutation;