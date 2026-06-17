import styles from './ArticlesHeader.module.scss';

export const ArticlesHeader = () => {
	return (
		<section className={styles.bzArtHeader}>
			<span className={styles.bzArtEyebrow}>Be žalos žurnalas</span>
			<h1>Straipsniai</h1>
			<p>
				Mokslu grįstos įžvalgos apie mitybą, emocinį valgymą ir santykį su maistu — kad pokyčiai vyktų su meile ir be žalos.
			</p>
		</section>
	);
};
