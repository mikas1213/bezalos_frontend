import styles from './ArticlesHeader.module.scss';

export const ArticlesHeader = () => {
	return (
		<section className={styles.bzArtHeader}>
			<span className={styles.bzArtEyebrow}>Be žalos žurnalas</span>
			<h1>Straipsniai</h1>
			<p>
				Jei valgai mažai, bet svoris stovi vietoje, o vakarais ateina tas vėl viską sugadinau jausmas, čia rasi atsakymus
				kodėl taip vyksta ir kaip sau padėti.
			</p>
		</section>
	);
};
