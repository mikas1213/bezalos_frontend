import styles from './RecipeNotFound.module.scss';

const RecipeNotFound = () => {
	return (
		<div className={styles.notFound}>
			<div className={styles.numbers}>
				<div>404</div>
				<div>Puslapis nerastas</div>
			</div>
		</div>
	);
};

export default RecipeNotFound;
