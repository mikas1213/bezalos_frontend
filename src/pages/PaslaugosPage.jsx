import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { jwtDecode } from "jwt-decode";
import useAuth from '../hooks/useAuth';
// import axios from '../api/axios';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import Main from '../components/UI/Main';
import Navbar from '../components/navbar/Navbar';
import Container from '../components/UI/Container';
import Paslaugos from '../components/paslaugos/Paslaugos';
import Naryste_card from '../components/paslaugos/naryste/Naryste_card';
import Service_card from '../components/paslaugos/miybos_planas/Service_card';

const PaslaugosPage = () => {
    const { auth } = useAuth();
    let loggedUser = {};
    if(auth.accessToken) loggedUser = jwtDecode(auth?.accessToken);
    const { user_id = '' } = loggedUser;
    
    const plans = [
        {id: 'ghjk54bh157usdjh', plan_price: 'virtuve_month', plan_name: 'virtuve', price: 16.9},
        {id: 'ghjk54bhjdiusdjh', plan_price: 'virtuve_year', plan_name: 'virtuve', price: 99},
        {id: 'asdf0897324kjsdf', plan_price: 'profilis_month', plan_name: 'profilis', price: 6.9},
        {id: 'ghjk5bhjdius093h', plan_price: 'profilis_year', plan_name: 'profilis', price: 69.9},
    ];

    const products = [
        {id: '0001', title: 'Prod 1', price: 1900},
        {id: '0002', title: 'Prod 2', price: 2750},
        {id: '0003', title: 'Prod 3', price: 3698},
        {id: '0004', title: 'Prod 4', price: 15087},
    ];
    
    const navigate = useNavigate();

    useEffect(() => {
        // document.body.style.backgroundColor = '#eff1ef';
        document.title = 'Be žalos | Paslaugos';
    }, []);

    const axiosPrivate = useAxiosPrivate();
    const handleSubscriptionCheckout = async ({ plan }) => {
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

    const handleServiceCheckout = async (product) => {
        try {
            const res = await axiosPrivate.post('/payments/service-checkout-session', product);
            console.log(res)
            // window.location = res.data.session.url;
        } catch (err) {
            console.log(err.message)
        }
    }

    return (
        <>
            <Navbar />
            <Main>
                <Container>
                    <Paslaugos>                        
                        {plans.map(plan => <Naryste_card 
                            key={plan.id} 
                            plan={plan} 
                            handleSubscriptionCheckout={handleSubscriptionCheckout} 
                        />)}

                        {products.map(product => <Service_card 
                            key={product.id}
                            product={product} 
                            handleServiceCheckout={handleServiceCheckout}
                        /> )}
                        
                    </Paslaugos>
                </Container>
            </Main>
        </>
        
    );
};

export default PaslaugosPage;