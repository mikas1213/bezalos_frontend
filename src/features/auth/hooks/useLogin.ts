import { useMutation } from '@tanstack/react-query';
import { useAuth } from './useAuth';

export const useLogin = () => {
    const { login } = useAuth();

    return useMutation({
        mutationFn: async ({ email, password }) => {
            await login(email, password);
        }
    });
};




/*


export const useCreateReservation = () => {
  const queryClient = useQueryClient();

  return useMutation<ReservationDTO, AxiosError<{ message: string }>, ReservationRequestDto>({
    mutationFn: (data) => reservationService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.reservations.all });
    },
  });
};


*/
