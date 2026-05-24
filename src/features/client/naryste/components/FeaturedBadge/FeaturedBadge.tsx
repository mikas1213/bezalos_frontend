import styles from './FeaturedBadge.module.scss';

type FeaturedBadgeProps = {
	label: string;
};

export function FeaturedBadge({ label }: FeaturedBadgeProps) {
	return <div className={styles.badge}>★ {label}</div>;
}
