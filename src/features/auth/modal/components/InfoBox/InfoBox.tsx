import cx from 'classnames';
import { CircleAlert } from 'lucide-react';

import styles from './InfoBox.module.scss';
interface InfoBoxProps {
	title?: string;
	subTitle: string;
	boldWord?: string;
	isDenied?: boolean;
}
export const InfoBox = ({ title, subTitle, boldWord = '', isDenied = false }: InfoBoxProps) => {
	let parts: string | string[] = subTitle;

	if (boldWord.length > 0) {
		parts = subTitle.split(boldWord);
	}

	return (
		<div className={cx(styles.infoBox, isDenied && styles.denied)}>
			<div className={styles.infoBoxContent}>
				<div className={styles.infoBoxIcon}>
					<CircleAlert />
				</div>
				<div>
					{title && <p className={styles.infoBoxTitle}>{title}</p>}

					{boldWord.length > 0 ? (
						<p className={styles.infoBoxText}>
							{parts[0]}
							<span>{boldWord}</span>
							{parts[1]}
						</p>
					) : (
						<p className={styles.infoBoxText}>{subTitle}</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default InfoBox;
