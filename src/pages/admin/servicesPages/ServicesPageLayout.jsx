import { Outlet } from 'react-router-dom';
import { useState, useCallback } from 'react';
import ServicesNav from '../../../components/admin/services/ServicesNav';
import AddNewModal from '../../../components/admin/services/AddNewModal';
import ServiceFrom from '../../../components/admin/services/service_form/ServiceForm';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import toast from 'react-hot-toast';

const service_form = {
    quantity: 1,
    discount: '0',
    sort: 1,
    is_active: true, 
    popular: false,
    details: [
        {id: 0, icon: '📗', title: '', desc: ''}, 
        {id: 1, icon: '🧐', title: '', desc: ''}, 
        {id: 2, icon: '❗️', title: '', desc: ''}
    ]
};

const ServicesPageLayout = () => {
    const [isModalOpen, setIsModalOpen] = useState({isOpen: false, form: '', action: ''});
    const [isLoading, setIsLoading] = useState(false);
    const [formValues, setFormValues] = useState({});
    const axiosPrivate = useAxiosPrivate();

    const handleModalOpen = (isOpen, form = '', action = '') => {
        isOpen && form === 'Paslaugą' && setFormValues(service_form);
        isOpen && form === 'Kodą' && setFormValues({popular: 'Two'});
        isOpen && form === 'Narystę' && setFormValues({});
        !isOpen && setFormValues({});
        setIsModalOpen({ isOpen, form, action });
    };

    const handleServiceForm = (e) => {
        if(e.target.dataset.id) {
            setFormValues(prevState => ({...prevState, details: prevState.details.map(detail => detail.id == e.target.dataset.id ? {
                ...detail,
                [e.target.name]: e.target.value,
            } : detail)}));
        } else {
            setFormValues(prevState => ({...prevState, [e.target.name]: e.target.value}));
        }
    };

    const handleSubmit = useCallback(async () => {
        
        try {
            setIsLoading(true);
            const formData = new FormData();
            Object.entries(formValues).forEach(([key, value]) => {
                
                if(key === 'details') {
                    formData.append(key, JSON.stringify(value));
                } else {
                    formData.append(key, value);
                }
                
            });
            
            if(isModalOpen.action === 'insert') {
                await axiosPrivate.post('/admin/services/add', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                toast.success('Paslauga sukurta');
            }

            if(isModalOpen.action === 'update') {
                await axiosPrivate.patch(`/admin/services/${formValues.id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                toast.success('Paslauga atnaujinta');
            }
            
            setIsLoading(false);
            handleModalOpen(false, '')
        } catch(err) {
            toast.error(err.response.data.message || err.message);
            setIsLoading(false);
        }
    }, [formValues, axiosPrivate, isModalOpen]);
    
    return (
        <>
            <ServicesNav isModalOpen={isModalOpen} handleModalOpen={handleModalOpen} />
            <Outlet context={{handleModalOpen, setFormValues}}/>
            {isModalOpen.isOpen && isModalOpen.form && <AddNewModal>
                {isModalOpen.form === 'Paslaugą' && <ServiceFrom 
                    isLoading={isLoading}
                    isModalOpen={isModalOpen}
                    formValues={formValues} 
                    setFormValues={setFormValues} 
                    handleServiceForm={handleServiceForm} 
                    handleSubmit={handleSubmit} 
                    handleModalOpen={handleModalOpen}
                />}
                {isModalOpen.form === 'Kodą' && <div>Nuolaidos kodas</div>}
                {isModalOpen.form === 'Narystę' && <div>Narystė</div>}
            </AddNewModal>}
        </>
    );
};

export default ServicesPageLayout;