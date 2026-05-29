import { Sparkles } from 'lucide-react';

import { Box, Cluster, Container } from '../../../../../../components/Shared';

import styles from './HeroSection.module.scss';
type Stat = {
	value: string;
	label: string;
};
interface HeroSectionProps {
	title: string;
	subTitle: string;
	stats: Stat[];
}
export const HeroSection = ({ title, subTitle, stats }: HeroSectionProps) => {
	return (
		<div className={styles.heroSection}>
			<div className={styles.decorativeIcon}>💚</div>
			<Container>
				<Cluster className={styles.badge} align="center" gap="var(--s-8)">
					<Sparkles size={16} color="var(--light-green-500)" />
					<Box className={styles.badgeText}>Rekomenduojama jums</Box>
				</Cluster>

				<h1 className={styles.title}>{title}</h1>
				<p className={styles.subTitle}>{subTitle}</p>

				<div className={styles.stats}>
					{stats.map((stat, index) => {
						return (
							<Box key={index} className={styles.stat}>
								<Box className={styles.statValue}>{stat.value}</Box>
								<Box className={styles.statLabel}>{stat.label}</Box>
							</Box>
						);
					})}
				</div>
			</Container>
		</div>
	);
};
