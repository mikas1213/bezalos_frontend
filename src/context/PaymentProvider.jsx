import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
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
/*
const handleSubscriptionCheckout = async ({ plan }) => {
    
    console.log(user_id)
    if(user_id) {
        try {
            const res = await axiosPrivate.post('/payments/checkout-session', {
                plan_price: plan.plan_price,
                plan_name: plan.plan_name, 
                user_id, 
            });
            console.log(res);
            window.location = res.data.session.url;
        } catch (err) {
            if(err.response.status === 401) {
                navigate('/prisijungti');
            }
        }
    } else {
        navigate('/prisijungti');
    }
};
*/
const PaymentContext = createContext();
const PaymentProvider = ({ children }) => {
    const { auth } = useAuth();
    let loggedUser = {};
    if(auth.accessToken) loggedUser = jwtDecode(auth?.accessToken);
    const { user_id = '' } = loggedUser;
    const axiosPrivate = useAxiosPrivate();    
    const navigate = useNavigate();

    const [period, setPeriod] = useState('month');
    const [variant, setVariant] = useState('virtuve');

    const selectedPlan = plans[period][variant];
    const plan = plans[period];

    // const testFn = () => {
    //     console.log('selectedPlan', selectedPlan);
    // };

    const handleSubscriptionCheckout = async (/*{ plan }*/) => {
        
        if(user_id) {
            try {
                const res = await axiosPrivate.post('/payments/checkout-session', 
                //     {
                //     plan_price: plan.plan_price,
                //     plan_name: plan.plan_name, 
                //     user_id, 
                // }
                selectedPlan
            );
                // console.log(res);
                window.location = res.data.session.url;
            } catch (err) {
                if(err.response.status === 401) {
                    navigate('/prisijungti');
                }
            }
        } else {
            navigate('/prisijungti');
        }
    };

    return (
        <PaymentContext.Provider value={{ period, setPeriod, variant, setVariant, plan, handleSubscriptionCheckout }}>
            {children}
        </PaymentContext.Provider>
    );
};

export {PaymentContext, PaymentProvider};