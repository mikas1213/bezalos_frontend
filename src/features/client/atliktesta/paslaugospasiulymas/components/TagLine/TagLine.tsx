import { Box } from '../../../../../../components/Shared';

import styles from './TagLine.module.scss';

interface TaLineProps {
	tagIcon: string;
	tagLine: string;
	description: string;
}
export const TagLine = ({ tagIcon, tagLine, description }: TaLineProps) => {
	return (
		<Box padding={['0', '0', '40px', '0']}>
			<div className={styles.tagLine}>
				<span className={styles.tagLineTitle}>
					{tagIcon} {tagLine}
				</span>
			</div>
			<p className={styles.description}>{description}</p>
		</Box>
	);
};
