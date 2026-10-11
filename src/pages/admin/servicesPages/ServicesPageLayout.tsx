import { type ChangeEvent, useState } from 'react';
import { Outlet } from 'react-router-dom';

import AddNewModal from '../../../components/admin/services/AddNewModal';
import PromotionForm from '../../../components/admin/services/forms/PromotionForm';
import ServiceFrom from '../../../components/admin/services/forms/ServiceForm';
import ServicesNav from '../../../components/admin/services/ServicesNav';
import type { ServiceDetail } from '../../../hooks/paslaugos/types';
import useAdminServices from '../../../hooks/paslaugos/useAdminServices';
import useAdminPromotions from '../../../hooks/paslaugos/useAdmniPromotions';
import useServiceMutation from '../../../hooks/paslaugos/useServiceMutation';

type FormValues = {
    id?: string;
    // paslaugos forma
    quantity?: number | string;
    discount?: string;
    base_price?: number | string;
    discounted_price?: number;
    sort?: number | string;
    status?: string;
    category?: string;
    is_active?: string;
    details?: ServiceDetail[];
    photo?: File;
    // akcijos forma
    promo_code?: string;
    promo_type?: string;
    usage_limit?: number | string;
    specific_products?: string[];
};

const service_form = {
    quantity: 10,
    discount: '0',
    base_price: 0,
    discounted_price: 0,
    sort: 1,
    status: '-',
    category: 'Pasirinkti',
    is_active: 'On',
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
    const { data: services, isLoading: isLoadingServices } = useAdminServices();
    const [isModalOpen, setIsModalOpen] = useState({isOpen: false, form: '', action: ''});
    const [formValues, setFormValues] = useState<FormValues>({});

    const handleModalOpen = (isOpen: boolean, form = '', action = '') => {
        if (!isOpen || form === 'subscription') {
            setFormValues({});
        } else if (form === 'services') {
            setFormValues(service_form);
        } else if (form === 'promo') {
            setFormValues(promotion_form);
        }
        
        setIsModalOpen({ isOpen, form, action });
    };

    const handleServiceForm = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

        const target = e.target;
        const { name, value } = target;


        if(target.dataset.id) {
            setFormValues(prevState => ({...prevState, details: prevState.details?.map(detail => String(detail.id) === target.dataset.id ? {
                ...detail,
                [target.name]: target.value,
            } : detail)}));

        } else if(name === 'specific_products') {
            setFormValues(prevState => {
                let specific_products = [...(prevState.specific_products ?? [])];
                if(!specific_products.includes(value)) {
                    specific_products.push(value);
                } else {
                    specific_products = specific_products.filter(item => item !== value); 
                }
                return {...prevState, specific_products};
            });

        } else {
            // TODO: klaida – `value` čia yra BET KURIO redaguojamo lauko reikšmė, o formulė ją laiko nuolaidos %.
            // Keičiant pvz. title: parseFloat('tekstas') = NaN → discounted_price = NaN (formoje rodoma "NaN").
            // Keičiant base_price: skaičiuojama nuo senos kainos (prevState.base_price), o nauja kaina laikoma nuolaida.
            // Sprendimas: pirma atnaujinti lauką, tada skaičiuoti iš atnaujinto state'o base_price ir discount.
            setFormValues(prevState => ({
                ...prevState,
                discounted_price: parseFloat(String(prevState.base_price)) - (parseFloat(String(prevState.base_price)) * parseFloat(value) / 100),
                [target.name]: target.value
            }));
        }
    };

    const getFormData = () => {
        const formData = new FormData();
        Object.entries(formValues).forEach(([key, value]) => {
            if(key.startsWith('image')) return;

            if(value instanceof Blob) {
                formData.append(key, value);
            } else {
                formData.append(key, key === 'details' ? JSON.stringify(value) : String(value));
            }
        });
        return formData;
    };

    const handleSubmit = () => {
        const formData = getFormData();
        formData.delete('discounted_price');
        serviceMutation.mutate({
            id: formValues.id,
            api: isModalOpen.form,
            formData,
            action: isModalOpen.action,
            onCloseModal: () => handleModalOpen(false, ''),
        });
    };

    const isLoading = serviceMutation.isPending;
    const { data: promotions, isLoading: isLoadingPromo } = useAdminPromotions();

    return (
        <>
            <ServicesNav isModalOpen={isModalOpen} handleModalOpen={handleModalOpen} />
            <Outlet context={{ handleModalOpen, setFormValues, services, isLoadingServices, promotions, isLoadingPromo }}/>

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
                    services={(services ?? []).filter(s => s.is_active === 'On')}
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