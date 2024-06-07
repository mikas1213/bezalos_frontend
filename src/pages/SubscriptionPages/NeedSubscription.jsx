import styles from "./NeedSubscription.module.css";
import Navbar from "../../components/navbar/Navbar";
import Main from "../../components/UI/Main";
import FlexContainer from "../../components/UI/FlexContainer";
// import { ImCheckmark2 } from "react-icons/im";
import NeedSubscriptionIcon from '../../assets/icons/png/needSubscription/needSubscriptionIcon.png';

const NeedSubscription = () => {
    return (
        <>
            <Navbar />
            <Main>
                <FlexContainer>
                    <div className={styles.needSubscriptionContainer}>
                        <img src={NeedSubscriptionIcon} alt='video-icon' />
                        <h2>Išbandyk narystę</h2>

                        <div className={styles.smallText}>
                            <p>Tapk Valgau be žalos</p>
                            <p>bendruomenės dalimi 💚</p>
                        </div>

                        {/* <button onClick={() => console.log('prenumeruoti')}>
                            Į narystę
                        </button> */}
                        <a href="https://www.bezalos.lt/paslaugos" target='_blank' rel='noreferrer'>Į narystę</a>
                    </div>
                </FlexContainer>
            </Main>
        </>
    );
};

export default NeedSubscription;
