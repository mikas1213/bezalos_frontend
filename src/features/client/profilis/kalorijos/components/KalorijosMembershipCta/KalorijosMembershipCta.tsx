import { Link } from 'react-router-dom';

import styles from './KalorijosMembershipCta.module.scss';

/** Kvietimas išbandyti narystę po skaičiuoklės rezultatu. */
export const KalorijosMembershipCta = () => (
	<div className={styles.cta}>
		<p className={styles.text}>
			Išbandyk narystę, kuri leis tau kurti receptus pagal parinktą kalorijų kiekį ir lengvai keisti ingredientus pagal
			savo poreikius.
		</p>
		<Link to="/paslaugos" className={styles.button}>
			Išbandyti narystę
		</Link>
	</div>
);
