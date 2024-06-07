import styles from './SuccessSubscription.module.css';
import Navbar from '../../components/navbar/Navbar';
import Main from '../../components/UI/Main';
import Container from '../../components/virtuve/Container';

import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
// import { jwtDecode } from "jwt-decode";

// import useAuth from '../../hooks/useAuth';
import axios from '../../api/axios';

const SuccessSubscription = () => {
    // const { auth }  = useAuth();
    // let loggedUser = {};
    // if(auth.accessToken) loggedUser = jwtDecode(auth?.accessToken);
    // const { user_id = ''} = loggedUser;

    const navigate = useNavigate();
    let [searchParams] = useSearchParams();

    useEffect(() => {
        const getData = async () => {
            
            try {
                const sid = searchParams.get('session_id');
                
                const data = await axios.post(`/payments/payment-success?session_id=${sid}`);
                console.log('data:', data)
            } catch (err) {
                console.log(err.message);
                navigate('/mokejimo-klaida');
            }
        };

        getData();
    }, []);


    return (
        <>
            <Navbar />
            <Main>
                <Container>
                    <div className={styles.successSubscription}>
                        <div>
                            <h3>Mokėjimas sėkmingas</h3>
                            <button>Taliau</button>
                        </div>
                    </div>
                </Container>
            </Main>
        </>
        
    );
};

export default SuccessSubscription;