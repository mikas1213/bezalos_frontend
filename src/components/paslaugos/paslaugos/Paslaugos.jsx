import Card from './Card';

import styles from './Paslaugos.module.css';

const Paslaugos = ({ isLoading, paslaugos }) => {
	return (
		<>
			{isLoading ? (
				<div className={styles.loadingContainer}></div>
			) : paslaugos ? (
				<div className={styles.paslaugos}>
					{paslaugos.map((paslauga) => (
						<Card key={paslauga.id} paslauga={paslauga} />
					))}
				</div>
			) : (
				<div className={styles.notFoundContainer}>Šiuo metu paslaugų nerasta</div>
			)}
		</>
	);
};

export default Paslaugos;
