import styles from "./SuccessSubscription.module.css";
import Navbar from "../../components/navbar/Navbar";
import Main from "../../components/UI/Main";
import Container from "../../components/virtuve/Container";

import {
    // useState,
    useEffect,
} from "react";
import {
    useNavigate,
    // useSearchParams
} from "react-router-dom";
// import { jwtDecode } from "jwt-decode";

// import useAuth from '../../hooks/useAuth';
import axios from "../../api/axios";

const SuccessSubscription = () => {
    const miniVirtuveIcon = <svg width='2rem' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2.5 7.25C2.08579 7.25 1.75 7.58579 1.75 8C1.75 8.41421 2.08579 8.75 2.5 8.75V7.25ZM22 7.25H2.5V8.75H22V7.25Z" fill="#1C274C"></path> <path d="M10.5 2.5L7 8" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> <path d="M17 2.5L13.5 8" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> <path d="M15 14.5C15 13.8666 14.338 13.4395 13.014 12.5852C11.6719 11.7193 11.0008 11.2863 10.5004 11.6042C10 11.9221 10 12.7814 10 14.5C10 16.2186 10 17.0779 10.5004 17.3958C11.0008 17.7137 11.6719 17.2807 13.014 16.4148C14.338 15.5605 15 15.1334 15 14.5Z" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> <path d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>;
    // const { auth }  = useAuth();
    // let loggedUser = {};
    // if(auth.accessToken) loggedUser = jwtDecode(auth?.accessToken);
    // const { user_id = ''} = loggedUser;

    const navigate = useNavigate();
    // let [searchParams] = useSearchParams();

    useEffect(() => {
        const getData = async () => {
            try {
                // const sid = searchParams.get('session_id');
                // const data = await axios.post(`/payments/payment-success?session_id=${sid}`);
                await axios.post(`/payments/payment-success`);
            } catch (err) {
                console.log(err.message);
                navigate("/mokejimo-klaida");
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
                        <div className={styles.successSubscriptionContent}>
                            <svg
                                viewBox='0 0 24 24'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                {/* <g id='SVGRepo_bgCarrier' strokeWidth='0'></g> */}
                                <g
                                    id='SVGRepo_tracerCarrier'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                ></g>
                                <g id='SVGRepo_iconCarrier'>
                                    <path
                                        d='M8.5 12.5L10.5 14.5L15.5 9.5'
                                        stroke='#60c040'
                                        strokeWidth="2"
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    ></path>
                                    <path
                                        d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"
                                        stroke="#60c040"
                                        strokeWidth="2"
                                        strokeLinecap='round'
                                    ></path>
                                </g>
                            </svg>
                            <div className={styles.textContainer}>
                                <h3>Ačiū Tau!</h3>
                                <span>Tavo narystė jau aktyvi</span>
                            </div>
                            <button onClick={() => navigate('/virtuve')}>Į Virtuvę</button>                            
                        </div>
                    </div>
                </Container>
            </Main>
        </>
    );
};

export default SuccessSubscription;
