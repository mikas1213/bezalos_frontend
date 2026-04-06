import { Box, Cluster } from '../../../../../../components/Shared';

import styles from './VideoLoading.module.scss';

export const VideoLoading = () => {
	return (
		<div className={styles.videoContainer}>
			<Cluster className={styles.videoSkeleton} justify="center" align="center">
				<Cluster justify="center" align="center" gap="0.85rem" dir="column">
					<div className={styles.spinner} />
					<span className={styles.label}>Kraunama...</span>
				</Cluster>
			</Cluster>

			<Box padding={['1.25rem', '', '', '']}>
				<Cluster dir="column" gap="0.75rem">
					<div className={`${styles.bone} ${styles.boneTitleLg}`} />
					<div className={`${styles.bone} ${styles.boneTitleSm}`} />
					<div className={styles.metaSkeleton}>
						<div className={`${styles.bone} ${styles.boneChip}`} />
						<div className={`${styles.bone} ${styles.boneChip}`} />
					</div>
					<div className={`${styles.bone} ${styles.boneDesc}`} />
					<div className={`${styles.bone} ${styles.boneDescShort}`} />
				</Cluster>
			</Box>
		</div>
	);
};
