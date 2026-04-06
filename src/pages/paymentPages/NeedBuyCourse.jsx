import { useNavigate } from 'react-router-dom';

import NeedSubscriptionIcon from '../../assets/icons/png/needSubscription/needSubscriptionIcon.png';
import FlexContainer from '../../components/UI/FlexContainer';
// import Navbar from '../../components/navbar/Navbar';
import Main from '../../components/UI/Main';

import styles from './NeedBuyCourse.module.css';

const NeedBuyCourse = () => {
	const navigate = useNavigate();
	return (
		<>
			{/* <Navbar /> */}
			<Main>
				<FlexContainer>
					<div className={styles.needSubscriptionContainer}>
						<img src={NeedSubscriptionIcon} alt="video-icon" />
						<h2>Įsigykite kursą</h2>
						<p>„Kodėl aš vis persivalgau?“</p>
						<div className={styles.smallText}>
							<p>Pirmas žingsnis į laisvesnį</p>
							<p>santykį su maistu 👇</p>
						</div>

						<button onClick={() => navigate('/paslaugos/kursas-kodel-as-vis-persivalgau')}>Įsigyti kursą</button>
					</div>
				</FlexContainer>
			</Main>
		</>
	);
};

export default NeedBuyCourse;
