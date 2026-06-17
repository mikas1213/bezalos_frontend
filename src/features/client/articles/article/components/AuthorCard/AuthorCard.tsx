import { initials } from '../../utils/initials';

import styles from './AuthorCard.module.scss';

interface AuthorCardProps {
	author: string;
}

export const AuthorCard = ({ author }: AuthorCardProps) => {
	return (
		<div className={styles.authorCard}>
			<div className={styles.authorAvatar}>{initials(author)}</div>
			<div className={styles.authorBody}>
				<span className={styles.authorEyebrow}>Autorė</span>
				<h4 className={styles.authorName}>{author}</h4>
				<p className={styles.authorText}>
					Mitybos specialistė ir „Be žalos“ bendruomenės įkūrėja. Padeda atkurti ramų, sąmoningą santykį su maistu — su
					meile ir be žalos.
				</p>
			</div>
		</div>
	);
};
