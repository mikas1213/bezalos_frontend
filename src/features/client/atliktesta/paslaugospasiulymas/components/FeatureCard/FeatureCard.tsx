import type { ComponentType } from 'react';

import type { LucideProps } from 'lucide-react';

import styles from './FeatureCard.module.scss';

interface FeatureCardProps {
	Icon: ComponentType<LucideProps>;
	title: string;
	description: string;
}
export const FeatureCard = ({ Icon, title, description }: FeatureCardProps) => {
	return (
		<div className={styles.featureCard}>
			<Icon size={28} color="var(--light-green-500)" strokeWidth={2} style={{ marginBottom: '12px' }} />
			<h4 className={styles.title}>{title}</h4>
			<p className={styles.description}>{description}</p>
		</div>
	);
};
