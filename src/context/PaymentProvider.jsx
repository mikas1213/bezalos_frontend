import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

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

const PaymentContext = createContext();

const PaymentProvider = () => {
    const { auth } = useAuth();
    let loggedUser = {};
    if(auth.accessToken) loggedUser = jwtDecode(auth?.accessToken);
    
    const { user_id = '' } = loggedUser;
    const axiosPrivate = useAxiosPrivate();    
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

    const handleServiceCheckout = async (paslauga) => {

        if(!user_id) {
            navigate('/prisijungti');
            return;
        }
        try {
            setIsLoading(true);

            const res = await axiosPrivate.post('/payments/service-checkout-session', {user_id, paslauga});
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

export { PaymentContext, PaymentProvider };