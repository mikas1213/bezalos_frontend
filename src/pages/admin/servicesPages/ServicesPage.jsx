import Service, { ServiceHeader } from '../../../components/admin/services/Service';
import { axiosPrivate } from '../../../api/axios';
import { useOutletContext } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const ServicesPage = () => {

    const queryClient = useQueryClient();
    const { handleModalOpen, setFormValues, services, isLoadingServices } = useOutletContext();
    
    const handleServiceDelete = useMutation({
        mutationFn: id => axiosPrivate.delete(`/admin/services/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-services'] })
        },
        onError: err => {
            toast.error(err.message || 'Klaida!');
        }
    });

    return (
        <div style={{
            marginTop: '0.5rem',
            display: 'flex',
            flexDirection: 'column', 
            gap: '0.5rem'
        }}>
            <ServiceHeader />
            {!isLoadingServices && services && services.map(service => <Service 
                key={service.id} 
                service={service} 
                handleModalOpen={handleModalOpen}
                setFormValues={setFormValues}
                handleServiceDelete={handleServiceDelete}
            />)}
        </div>
    );
};

export default ServicesPage;