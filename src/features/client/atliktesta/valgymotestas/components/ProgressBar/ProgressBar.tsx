import { Box, Cluster } from '../../../../../../components/Shared';

import styles from './ProgressBar.module.scss';
interface ProgresBarProps {
	currentPage: number;
	questionLength: number;
	progress: number;
}

export const ProgressBar = ({ currentPage, questionLength, progress }: ProgresBarProps) => {
	return (
		<Box className={styles.progressBar}>
			<Cluster className={styles.progressBarInner} justify="space-between" align="center">
				<span className={styles.questionPages}>
					Klausimas {currentPage + 1} iš {questionLength}
				</span>

				<span className={styles.progressPercents}>{Math.round(progress)}%</span>
			</Cluster>

			<div className={styles.progressLine}>
				<div className={styles.progress} style={{ width: `${progress}%` }} />
			</div>
		</Box>
	);
};
