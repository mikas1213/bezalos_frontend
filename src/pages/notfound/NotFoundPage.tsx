import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
	return (
		<>
			<div className={styles.page404}>
				<div className={styles.numbers}>
					<div>404</div>
					<div>Puslapis nerastas</div>
				</div>
			</div>
		</>
	);
};
