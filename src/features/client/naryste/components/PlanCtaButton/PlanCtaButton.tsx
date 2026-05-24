import type { Period, Variant } from '../../hooks/types';

import styles from './PlanCtaButton.module.scss';
type PlanCtaButtonProps = {
	label: string;
	variant: Variant;
	billing: Period;
	featured: boolean;
	consent: boolean;
	isLoading?: boolean;
	onSubscriptionCheckout: (p: Period, v: Variant) => void;
	onTryWithoutConsent: () => void;
};

export function PlanCtaButton({
	label,
	variant,
	billing,
	featured,
	consent,
	isLoading = false,
	onSubscriptionCheckout,
	onTryWithoutConsent,
}: PlanCtaButtonProps) {
	const bg = featured ? '#5CD45C' : '#0E3D2E';
	const color = featured ? '#0A2F22' : '#F4F1EA';
	const shadow = featured ? '0 14px 28px -12px #5CD45C' : '0 10px 20px -10px rgba(14,61,46,0.4)';

	return (
		<button
			type="button"
			className={styles.button}
			style={{
				background: bg,
				color,
				boxShadow: shadow,
				cursor: isLoading ? 'default' : undefined,
			}}
			onClick={(e) => {
				if (isLoading) return;
				if (!consent) {
					onTryWithoutConsent();
					return;
				}
				const btn = e.currentTarget;
				btn.style.transform = 'scale(0.98)';
				onSubscriptionCheckout(billing, variant);
				setTimeout(() => {
					btn.style.transform = '';
				}, 150);
			}}
			onMouseEnter={(e) => {
				if (consent && !isLoading) {
					e.currentTarget.style.filter = 'brightness(1.06)';
					e.currentTarget.style.transform = 'translateY(-1px)';
				}
			}}
			onMouseLeave={(e) => {
				e.currentTarget.style.filter = '';
				e.currentTarget.style.transform = '';
			}}
		>
			{isLoading && <span className={styles.loader} />}
			<span style={{ visibility: isLoading ? 'hidden' : 'visible' }}>{label}</span>
		</button>
	);
}
