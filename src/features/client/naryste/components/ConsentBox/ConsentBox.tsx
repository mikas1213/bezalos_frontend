import { forwardRef } from 'react';

import styles from './ConsentBox.module.scss';

const C = {
	ink: '#0E3D2E',
	accent: '#5CD45C',
	accentDark: '#2D8B3F',
};

type ConsentBoxProps = {
	checked: boolean;
	onChange: (v: boolean) => void;
	attention: boolean;
};

export const ConsentBox = forwardRef<HTMLDivElement, ConsentBoxProps>(function ConsentBox({ checked, onChange, attention }, ref) {
	return (
		<div
			ref={ref}
			className={`${styles.root}${attention ? ` ${styles.attention}` : ''}`}
			style={{
				background: attention ? 'rgba(92,212,92,0.10)' : 'transparent',
				border: `1.5px solid ${attention ? C.accentDark : 'rgba(14,61,46,0.10)'}`,
			}}
		>
			<label className={styles.label}>
				<input
					type="checkbox"
					checked={checked}
					onChange={(e) => onChange(e.target.checked)}
					className={styles.hiddenInput}
				/>
				<span
					className={styles.checkbox}
					style={{
						border: `1.5px solid ${checked ? C.ink : attention ? C.accentDark : 'rgba(14,61,46,0.30)'}`,
					}}
				>
					<svg
						width="13"
						height="13"
						viewBox="0 0 12 12"
						fill="none"
						style={{
							opacity: checked ? 1 : 0,
							transform: checked ? 'scale(1)' : 'scale(0.5)',
							transition: 'opacity .18s, transform .18s',
						}}
					>
						<path
							d="M2 6.5L4.8 9.2 10 3.8"
							stroke={C.accent}
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</span>
				Sutinku su pirkimo pardavimo taisyklėmis
			</label>
			<p className={styles.note}>
				Įsigijant paslaugą, jūs sutinkate su bezalos.lt{' '}
				<a href="https://bezalos.lt/pirkimo-taisykles" target="_blank" rel="noreferrer" className={styles.link}>
					Pirkimo pardavimo taisyklėmis.
				</a>
			</p>
		</div>
	);
});
