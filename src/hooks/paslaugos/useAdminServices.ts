import toast from 'react-hot-toast';

import { useQuery } from '@tanstack/react-query';

import { axiosPrivate } from '../../api/axios';

import type { Service } from './types';

const useAdminServices = () => {
    const fetchData = async (): Promise<Service[]> => {

        try {
            const { data: services } = await axiosPrivate.get<Service[]>('/admin/services');
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
            throw new Error((err instanceof Error && err.message) || 'Error');
        }
    };

    return useQuery({
        queryKey: ['admin-services'],
        queryFn: fetchData,
        staleTime: 5 * 60 * 1000
    });
};

export default useAdminServices;
