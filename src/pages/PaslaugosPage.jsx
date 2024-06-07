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
    const navigate = useNavigate();

    useEffect(() => {
        // document.body.style.backgroundColor = '#eff1ef';
        document.title = 'Be žalos | Paslaugos';
    }, []);

    const axiosPrivate = useAxiosPrivate();
    const handleCheckout = async ({ plan }) => {
        try {
            const res = await axiosPrivate.post('/payments/checkout-session', {
                plan_price: plan.plan_price,
                plan_name: plan.plan_name, 
                user_id, 
            });
            
            window.location = res.data.session.url;
        } catch (err) {
            console.log(err.message);
            if(err.response.status === 401) {
                navigate('/prisijungti');
            }
        }
        
    };

    return (
        <>
            <Navbar />
            <Main>
                <Container>
                    <Paslaugos>                        
                        {plans.map(plan => <Naryste_card 
                            key={plan.id} 
                            plan={plan} 
                            handleCheckout={handleCheckout} 
                        />)}
                    </Paslaugos>
                    {/* <a href="https://billing.stripe.com/p/login/test_14kg0Meu27G4gdGcMN">Valdyt paslaugas</a> */}
                </Container>
            </Main>
        </>
        
    );
};

export default PaslaugosPage;