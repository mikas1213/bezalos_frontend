import { Info } from 'lucide-react';

import styles from './MacroInfo.module.scss';

const macros = [
	{ key: 'A', label: 'angliavandeniai', color: 'var(--color-a)' },
	{ key: 'B', label: 'baltymai', color: 'var(--color-b)' },
	{ key: 'R', label: 'riebalai', color: 'var(--color-r)' },
];

export const MacroInfo = () => {
	return (
		<span className={styles.wrap}>
			<button type="button" className={styles.trigger} aria-label="Ką reiškia makro pjūvis">
				<Info size={14} />
			</button>

			<span className={styles.card} role="tooltip">
				<span className={styles.title}>Makro pjūvis</span>
				<p className={styles.text}>
					Kiekvienas receptas pažymėtas <strong>dviem vyraujančiais makro</strong> — todėl filtrai yra poros, pvz.{' '}
					<strong>A+B</strong>.
				</p>
				<ul className={styles.list}>
					{macros.map((m) => (
						<li key={m.key} className={styles.item}>
							<span className={styles.dot} style={{ background: m.color }} />
							<strong>{m.key}</strong> — {m.label}
						</li>
					))}
				</ul>
			</span>
		</span>
	);
};
