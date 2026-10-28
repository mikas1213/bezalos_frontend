import type { ProfilisHeaderContent } from '../../constants/ProfilisHeaders';
import { ProfilisHowItWorks } from '../ProfilisHowItWorks';

import styles from './ProfilisHeader.module.scss';

/**
 * Profilio puslapio antraštė: pavadinimas, nebūtina paantraštė ir nebūtinas „Kaip tai veikia“.
 * Puslapių tekstai – `PROFILIS_HEADERS`: `<ProfilisHeader {...PROFILIS_HEADERS.kalorijos} />`.
 */
export const ProfilisHeader = ({ title, subtitle, tutorialLink }: ProfilisHeaderContent) => {
	return (
		<header className={styles.header}>
			<div className={styles.text}>
				<h1 className={styles.title}>{title}</h1>
				{subtitle && <p className={styles.subtitle}>{subtitle}</p>}
			</div>
			{tutorialLink && <ProfilisHowItWorks href={tutorialLink} />}
		</header>
	);
};
