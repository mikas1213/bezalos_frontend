import styles from './SuccessBuyService.module.css';
import Navbar from '../../components/navbar/Navbar';
import Main from '../../components/UI/Main';
import Container from '../../components/UI/Container';
import { RiMessengerLine } from 'react-icons/ri';
import { House } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';

const SuccessBuyService = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
        document.body.style.backgroundColor = '#fff';
    }, []);
    
    return (
        <>
            <Navbar />
            <Main>
                <Container>
                    <div className={styles.successBuyService}>
                        <div className={styles.successBuyServiceContainer}>
                           <div className={styles.iconContainer}>
                                <svg className={styles.mainiIcon} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                    <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
                                    <g id='SVGRepo_iconCarrier'>
                                        <path d='M8.5 12.5L10.5 14.5L15.5 9.5' stroke='#60c040' strokeWidth="2" strokeLinecap='round' strokeLinejoin='round'></path>
                                        <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#60c040" strokeWidth="2" strokeLinecap='round'></path>
                                    </g>
                                </svg>
                           </div>

                            <div className={styles.text}>
                                <h1>Paslauga sėkmingai užsakyta</h1>
                                <h2>Nepamirškite susisiekti!</h2>
                            </div>

                            <div className={styles.info}>
                                <div className={styles.smallIconContainer}>
                                    <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                        <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
                                        <g id='SVGRepo_iconCarrier'>
                                            <path d='M8.5 12.5L10.5 14.5L15.5 9.5' stroke='#60c040' strokeWidth="2" strokeLinecap='round' strokeLinejoin='round'></path>
                                            <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#60c040" strokeWidth="2" strokeLinecap='round'></path>
                                        </g>
                                    </svg>
                                </div>
                                <div className={styles.infoText}>
                                    <span>Užsakymas patvirtintas</span>
                                    <span>Patvirtinimo el. laiškas išsiųstas</span>
                                </div> 
                            </div>
                            <div className={styles.buttons}>
                                <NavLink to='https://www.facebook.com/sandra.jatulyte' target='_blank'>
                                    <button className={styles.btn_1}>
                                        Susisiekti 
                                        <RiMessengerLine className={styles.icon} />
                                    </button>
                                </NavLink>
                                <button className={styles.btn_2} onClick={() => navigate('/')}>
                                    Grįžti į pradžią 
                                    <House className={styles.icon}/>
                                </button>
                            </div>
                        </div>
                    </div>
                </Container>
            </Main>
        </>
    );
};

export default SuccessBuyService;