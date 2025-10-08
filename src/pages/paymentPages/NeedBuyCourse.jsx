import styles from './NeedBuyCourse.module.css';
import Navbar from '../../components/navbar/Navbar';
import Main from '../../components/UI/Main';
import { useNavigate } from 'react-router-dom';
import FlexContainer from '../../components/UI/FlexContainer';
import NeedSubscriptionIcon from '../../assets/icons/png/needSubscription/needSubscriptionIcon.png';

const NeedBuyCourse = () => {
    const navigate = useNavigate();
    return (
        <>
            <Navbar />
            <Main>
                <FlexContainer>
                    <div className={styles.needSubscriptionContainer}>
                        <img src={NeedSubscriptionIcon} alt='video-icon' />
                        <h2>Įsigykite kursą</h2>
                        <p>„Kodėl aš vis persivalgau?“</p>
                        <div className={styles.smallText}>
                            <p>Pirmas žingsnis į laisvesnį</p>
                            <p>santykį su maistu 👇</p>
                        </div>

                        <button onClick={() => navigate('/paslaugos/kursas-kodel-as-vis-persivalgau') }>
                            Įsigyti kursą
                        </button>
                    </div>
                </FlexContainer>
            </Main>
        </>
    );
};

export default NeedBuyCourse;
