import useAdminPaslaugos from '../../../hooks/paslaugos/useAdminPaslaugos';
import Service, { ServiceHeader } from '../../../components/admin/services/Service';
// import { useOutletContext } from 'react-router-dom';

const ServicesPage = () => {
    // const { data:services, isLoading } = usePaslaugos();
    const { data: services, isLoading } = useAdminPaslaugos();
    // const { handleModalOpen } = useOutletContext();

    return (
        <div style={{
            marginTop: '0.5rem',
            display: 'flex',
            flexDirection: 'column', 
            gap: '0.5rem'
        }}>
            <ServiceHeader />
            {!isLoading && services.map(service => <Service key={service.id} service={service} />)}
        </div>
    );
};

export default ServicesPage;