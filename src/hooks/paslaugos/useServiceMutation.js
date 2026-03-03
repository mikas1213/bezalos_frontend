import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosPrivate } from '../../api/axios';
import toast from 'react-hot-toast';

const useServiceMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, api, formData, action }) => {
            
            const config = { headers: { 'Content-Type': 'multipart/form-data' } };
            return action === 'insert'
                ? axiosPrivate.post(`/admin/${api}/add`, formData, config)
                : axiosPrivate.patch(`/admin/${api}/${id}`, formData, config);
        },
        onSuccess: (_, variables) => {
            
            queryClient.invalidateQueries({ queryKey: [`admin-${variables.api}`] });
            toast.success(variables.action === 'insert' ? `${variables.api === 'services' ? 'Paslauga pridėta' : 'Kodas pridėtas'}` : 'Paslauga atnaujinta');
            variables.onCloseModal();
        },
        onError: (err, variables) => {
            toast.error(err.response?.data?.message || err.message || `Klaida ${variables.action === 'insert' ? 'pridedant' : 'atnaujinant'} paslaugą`);
        }
    });
};

export default useServiceMutation;