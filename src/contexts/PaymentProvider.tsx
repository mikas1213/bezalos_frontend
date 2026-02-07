import { Outlet } from 'react-router-dom';
import { useContext, useState, useRef, useEffect } from 'react';
import { useAuth, useAxiosPrivate } from '../features/auth';
import { useModal } from '../features/modal';
import { PaymentContext } from './PaymentContext';

interface PlanData {
    plan_price: string;
    plan_name: string;
    plan_name_lt: string;
    plan_period: string;
    price: string;
}

interface PendingCheckout {
    type: 'subscription' | 'service';
    planData?: PlanData;
    serviceData?: {
        service: Record<string, unknown>;
        code: string;
        isCodeApproved: boolean;
    };
}

const plans: Record<string, Record<string, PlanData>> = {
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
    const { openModal } = useModal();
    const axiosPrivate = useAxiosPrivate();

    const user_role = user?.user_role;
    const user_id = user?.user_id ?? '';    

    const [period, setPeriod] = useState<string>('month');
    const [variant, setVariant] = useState<string>('virtuve');
    const [isLoading, setIsLoading] = useState(false);
    const selectedPlan = plans[period][variant];
    const plan = plans[period];

    // Ref to store pending checkout - survives re-renders
    const pendingCheckoutRef = useRef<PendingCheckout | null>(null);
    const wasWaitingForLogin = useRef(false);

    // Execute pending checkout when user becomes available
    useEffect(() => {
        if (user_id && wasWaitingForLogin.current && pendingCheckoutRef.current) {
            const pending = pendingCheckoutRef.current;
            pendingCheckoutRef.current = null;
            wasWaitingForLogin.current = false;

            if (pending.type === 'subscription' && pending.planData) {
                executeSubscriptionCheckout(pending.planData);
            } else if (pending.type === 'service' && pending.serviceData) {
                const { service, code, isCodeApproved } = pending.serviceData;
                executeServiceCheckout(service, code, isCodeApproved);
            }
        }
    }, [user_id]);

    // Execute subscription checkout
    const executeSubscriptionCheckout = async (planData: PlanData) => {
        try {
            setIsLoading(true);
            const res = await axiosPrivate.post('/payments/checkout-session', { ...planData, user_id });
            window.location.href = res.data.session.url;
        } catch (err) {
            setIsLoading(false);
        }
    };

    // Execute service checkout
    const executeServiceCheckout = async (service: Record<string, unknown>, code: string, isCodeApproved: boolean) => {
        try {
            setIsLoading(true);
            const res = await axiosPrivate.post('/payments/service-checkout-session', { user_role, user_id, service, code, isCodeApproved });
            window.location.href = res.data.session.url;
        } catch (err) {
            setIsLoading(false);
        }
    };
    
    const handleSubscriptionCheckout = async () => {
        if (!user_id) {
            // Store pending checkout and open auth modal
            pendingCheckoutRef.current = { type: 'subscription', planData: selectedPlan };
            wasWaitingForLogin.current = true;
            openModal('auth');
            return;
        }
        await executeSubscriptionCheckout(selectedPlan);
    };

    const handleServiceCheckout = async (paslauga: Record<string, unknown>, code = '', isCodeApproved = false) => {
        const service = { ...paslauga };
        delete service.image_s;
        delete service.image_m;
        delete service.image_l;

        if (!user_id) {
            // Store pending checkout and open auth modal
            pendingCheckoutRef.current = { type: 'service', serviceData: { service, code, isCodeApproved } };
            wasWaitingForLogin.current = true;
            openModal('auth');
            return;
        }
        await executeServiceCheckout(service, code, isCodeApproved);
    };

    return (
        <PaymentContext.Provider value={{ isLoading, period, setPeriod, variant, setVariant, plan, handleSubscriptionCheckout, handleServiceCheckout }}>
            <Outlet />
        </PaymentContext.Provider>
    );
};

export const usePayment = () => {
    const context = useContext(PaymentContext);
    if (context === undefined) throw new Error('PaymentContext was used outside of the PaymentProvider');
    return context;
};