import { useNavigate } from 'react-router-dom';

import NeedSubscriptionIcon from '../../assets/icons/png/needSubscription/needSubscriptionIcon.png';
import FlexContainer from '../../components/UI/FlexContainer';
import Main from '../../components/UI/Main';

import styles from './NeedSubscription.module.css';

const NeedSubscription = () => {
	const navigate = useNavigate();
	return (
		<>
			<Main>
				<FlexContainer>
					<div className={styles.needSubscriptionContainer}>
						<img src={NeedSubscriptionIcon} alt="video-icon" />
						<h2>Išbandyk narystę</h2>

						<div className={styles.smallText}>
							<p>Tapk Valgau be žalos</p>
							<p>bendruomenės dalimi 💚</p>
						</div>

						<button onClick={() => navigate('/paslaugos')}>Į narystę</button>
					</div>
				</FlexContainer>
			</Main>
		</>
	);
};

export default NeedSubscription;
