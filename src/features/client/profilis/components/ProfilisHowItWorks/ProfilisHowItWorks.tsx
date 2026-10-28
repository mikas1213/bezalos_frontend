import styles from './ProfilisHowItWorks.module.scss';

interface ProfilisHowItWorksProps {
	/** Vaizdo įrašo nuoroda (pvz. YouTube). Atsidaro naujame skirtuke. */
	href: string;
	label?: string;
}

/** „Kaip tai veikia“ mygtukas-nuoroda su žaliu ▶ apskritimu kairėje. */
export const ProfilisHowItWorks = ({ href, label = 'Kaip tai veikia' }: ProfilisHowItWorksProps) => {
	return (
		<a href={href} target="_blank" rel="noopener noreferrer" className={styles.howItWorks}>
			<span className={styles.play} aria-hidden="true">
				<svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
					<path d="M8 5v14l11-7z" />
				</svg>
			</span>
			{label}
			<span className={styles.srOnly}> (atsidaro naujame skirtuke)</span>
		</a>
	);
};
