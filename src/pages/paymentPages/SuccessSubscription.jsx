import styles from './SuccessSubscription.module.css';
import Main from '../../components/UI/Main';
import Container from '../../components/virtuve/Container';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from '../../api/axios';

const SuccessSubscription = () => {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const plan = searchParams.get('plan');
    
    useEffect(() => {
        const getData = async () => {
            try {
                await axios.post(`/payments/payment-success`);
                
                // Meta Pixel tracking for subscription purchase
                if (typeof window.fbq === 'function') {
                    window.fbq('track', 'Subscribe', {
                        currency: 'EUR',
                        content_type: 'subscription',
                        content_category: plan || 'general'
                    });
                }
            } catch (err) {
                navigate('/mokejimo-klaida');
            }
        };
        getData();
    }, [navigate, plan]);

    return (
        <>
            <Main>
                <Container>
                    <div className={styles.successSubscription}>
                        <div className={styles.successSubscriptionContent}>
                            <svg className={styles.successIcon}
                                viewBox='0 0 24 24'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
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
                                
                                {plan === 'virtuve' && <a href='https://www.facebook.com/sandra.jatulyte' target='_blank' rel='noreferrer'>
                                    Susisiek!&nbsp;<span className={styles.heartIcon}>💌</span>
                                </a>}    
                            </div>
                            
                            {plan === 'virtuve' && <button 
                                onClick={() => navigate('/virtuve')}
                                className={styles.successVirtuveBtn}
                            >Į Virtuvę</button>}

                            {plan === 'profilis' && <button 
                                onClick={() => navigate('/profilis')}
                                className={styles.successProfileBtn}
                            >
                                Į Profilį!&nbsp;
                                <span className={styles.heartIcon}>➡️</span>
                            </button>}
                        </div>
                    </div>
                </Container>
            </Main>
        </>
    );
};

export default SuccessSubscription;
