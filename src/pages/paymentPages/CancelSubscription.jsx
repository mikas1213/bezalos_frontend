import Main from '../../components/UI/Main';

import styles from './CancelSubscription.module.css';

const CancelSubscription = () => {
	return (
		<>
			<Main>
				<div className={styles.cancelSubscription}>
					<div>
						<h3>Kažkas negerai</h3>
						<a href="http://localhost:5173/paslaugos">Į paslaugas</a>
					</div>
				</div>
			</Main>
		</>
	);
};

export default CancelSubscription;
