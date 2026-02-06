import { Outlet } from 'react-router-dom';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../features/auth';
import { useAxiosPrivate } from '../features/auth';
import { PaymentContext } from './PaymentContext';

const plans = {
    month: {
        profilis: {plan_price: 'profilis_month', plan_name: 'profilis', plan_name_lt: 'Profilis', plan_period: 'mėnesiui', price: '6,90'},
        virtuve: {plan_price: 'virtuve_month', plan_name: 'virtuve', plan_name_lt: 'Virtuvė', plan_period: 'mėnesiui', price: '16,90'}
    },
    year: {
        profilis: {plan_price: 'profilis_year', plan_name: 'profilis', plan_name_lt: 'Profilis', plan_period: 'metams', price: '69,90'},
        virtuve: {plan_price: 'virtuve_year', plan_name: 'virtuve', plan_name_lt: 'Virtuvė', plan_period: 'metams', price: '99,90'}
    }
};

export const PaymentProvider = () => {
    const { user } = useAuth();
    const axiosPrivate = useAxiosPrivate();

    const user_role = user?.user_role;
    const user_id = user?.user_id ?? '';    
    const navigate = useNavigate();

    const [period, setPeriod] = useState('month');
    const [variant, setVariant] = useState('virtuve');
    const [isLoading, setIsLoading] = useState(false);
    const selectedPlan = plans[period][variant];
    const plan = plans[period];
    
    const handleSubscriptionCheckout = async () => {
        
        if(!user_id) {
            navigate('/prisijungti');
            return;
        }
        try {
            setIsLoading(true);
            const res = await axiosPrivate.post('/payments/checkout-session', { ...selectedPlan, user_id });
            window.location = res.data.session.url;
        } catch (err) {
            if(err.response.status === 401) {
                navigate('/prisijungti');
            }
            setIsLoading(false);
        } 
    };

    const handleServiceCheckout = async (paslauga, code = '', isCodeApproved) => {
        
        if(!user_id) {
            navigate('/prisijungti');
            return;
        }
        const service = {...paslauga};
        delete service.image_s;
        delete service.image_m;
        delete service.image_l;
        try {
            setIsLoading(true);
            const res = await axiosPrivate.post('/payments/service-checkout-session', {user_role, user_id, service, code, isCodeApproved});
            
            window.location = res.data.session.url;
        } catch (err) {
            if(err.response.status === 401) {
                navigate('/prisijungti');
            }
            setIsLoading(false);
        } 
    };

    return (
        <PaymentContext.Provider value={{ isLoading, period, setPeriod, variant, setVariant, plan, handleSubscriptionCheckout, handleServiceCheckout }}>
            <Outlet />
        </PaymentContext.Provider>
    );
};

export const usePayment = () => {
    const context = useContext(PaymentContext);
    if(context === undefined) throw new Error('PaymentContext was used outside of the PaymentProvider');
    return context;
};