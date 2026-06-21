import authorAvatar from '../../../assets/images/author.webp';

import styles from './AuthorCard.module.scss';

interface AuthorCardProps {
	author: string;
}

export const AuthorCard = ({ author }: AuthorCardProps) => {
	return (
		<div className={styles.authorCard}>
			<img className={styles.authorAvatar} src={authorAvatar} alt={author} />
			<div className={styles.authorBody}>
				<span className={styles.authorEyebrow}>Autorė</span>
				<h4 className={styles.authorName}>{author}</h4>
				<p className={styles.authorText}>
					Emocinio valgymo ir KET terapeutė. Padedu atkurti sveiką santikį su maistu be dietų ir kaltės jausmo.
				</p>
			</div>
		</div>
	);
};
