import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import useServiceMutation from '../../../hooks/paslaugos/useServiceMutation';
import useAdminPaslaugos from '../../../hooks/paslaugos/useAdminPaslaugos';
import ServicesNav from '../../../components/admin/services/ServicesNav';
import AddNewModal from '../../../components/admin/services/AddNewModal';
import ServiceFrom from '../../../components/admin/services/forms/ServiceForm';
import PromotionForm from '../../../components/admin/services/forms/PromotionForm';

const service_form = {
    quantity: 1,
    discount: '0',
    sort: 1,
    is_active: 'On', 
    popular: 'Off',
    details: [
        {id: 0, icon: '📗', title: '', desc: ''}, 
        {id: 1, icon: '🧐', title: '', desc: ''}, 
        {id: 2, icon: '❗️', title: '', desc: ''}
    ]
};
const promotion_form = {
    promo_code: '',
    promo_type: 'Procentai',
    usage_limit: 10,
    specific_products: []
}

const ServicesPageLayout = () => {
    const serviceMutation = useServiceMutation();
    const { data: services, isLoading: isLoadingServices } = useAdminPaslaugos();
    const [isModalOpen, setIsModalOpen] = useState({isOpen: false, form: '', action: ''});
    const [formValues, setFormValues] = useState({});
    
    const handleModalOpen = (isOpen, form = '', action = '') => {
        isOpen && form === 'services' && setFormValues(service_form);
        isOpen && form === 'promo' && setFormValues(promotion_form);
        isOpen && form === 'subscription' && setFormValues({});
        !isOpen && setFormValues({});
        setIsModalOpen({ isOpen, form, action });
    };

    const handleServiceForm = (e) => {
        const target = e.target || e.current;
        const { name, value } = target; 
        
        if(target?.dataset.id) {
            setFormValues(prevState => ({...prevState, details: prevState.details.map(detail => detail.id == target.dataset.id ? {
                ...detail,
                [target.name]: target.value,
            } : detail)}));

        } else if(name === 'specific_products') {
            setFormValues(prevState => {
                let specific_products = [...prevState.specific_products];
                if(!specific_products.includes(value)) {
                    specific_products.push(value);
                } else {
                    specific_products = specific_products.filter(item => item !== value); 
                }
                return {...prevState, specific_products};
            });

        } else {
            setFormValues(prevState => ({...prevState, [target.name]: target.value}));
        }
    };

    const getFormData = () => {
        const formData = new FormData();
        Object.entries(formValues).forEach(([key, value]) => {
            if(!key.startsWith('image')) {
                formData.append(key, key === 'details' ? JSON.stringify(value) : value);
            }
        });
        return formData;
    };

    const handleSubmit = () => {
        const formData = getFormData();

        serviceMutation.mutate({
            id: formValues.id,
            api: isModalOpen.form,
            formData,
            action: isModalOpen.action,
            onCloseModal: () => handleModalOpen(false, ''),
        });
    };

    const isLoading = serviceMutation.isPending;

    return (
        <>
            <ServicesNav isModalOpen={isModalOpen} handleModalOpen={handleModalOpen} />
            <Outlet context={{ handleModalOpen, setFormValues, services, isLoadingServices }}/>

            {isModalOpen.isOpen && isModalOpen.form && <AddNewModal>
                {isModalOpen.form === 'services' && <ServiceFrom 
                    isLoading={isLoading}
                    isModalOpen={isModalOpen}
                    formValues={formValues} 
                    setFormValues={setFormValues} 
                    handleServiceForm={handleServiceForm} 
                    handleSubmit={handleSubmit} 
                    handleModalOpen={handleModalOpen}
                />}

                {isModalOpen.form === 'promo' && <PromotionForm
                    isLoading={isLoading} 
                    services={services.filter(s => s.is_active === 'On')}
                    isModalOpen={isModalOpen}
                    formValues={formValues}
                    setFormValues={setFormValues}
                    handleSubmit={handleSubmit}
                    handleServiceForm={handleServiceForm}
                    handleModalOpen={handleModalOpen}
                />}

                {isModalOpen.form === 'subscription' && <div>Narystė</div>}
            </AddNewModal>}
        </>
    );
};

export default ServicesPageLayout;