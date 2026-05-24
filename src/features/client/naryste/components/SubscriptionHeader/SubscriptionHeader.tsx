import styles from './SubscriptionHeader.module.scss';
export const SubscriptionHeader = () => {
	return (
		<>
			<h1 className={styles.heading}>
				Pasirink savo kelią į <em className={styles.headingAccent}>ilgalaikius</em> pokyčius
			</h1>
			<p className={styles.subtitle}>
				Trys skirtingi būdai pradėti. Visi keičiami arba atšaukiami bet kada — be įsipareigojimų.
			</p>
		</>
	);
};
