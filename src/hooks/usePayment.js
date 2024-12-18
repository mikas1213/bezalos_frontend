import { useContext } from 'react';
import { PaymentContext } from '../context/PaymentProvider';

const usePayment = () => {
    const context = useContext(PaymentContext);
    if(context === undefined) throw new Error('PaymentContext was used outside of the PaymentProvider');
    return useContext(PaymentContext);
};

export default usePayment;