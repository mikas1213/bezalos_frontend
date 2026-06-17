import cx from 'classnames';

import type { TocEntry } from '../../hooks';

import styles from './TableOfContents.module.scss';

interface TableOfContentsProps {
	entries: TocEntry[];
	activeId: string | null;
	onJump: (id: string) => void;
}

export const TableOfContents = ({ entries, activeId, onJump }: TableOfContentsProps) => {
	if (entries.length === 0) return null;

	return (
		<aside className={styles.toc}>
			<nav className={styles.tocInner}>
				<span className={styles.tocTitle}>Turinys</span>
				<ul className={styles.tocList}>
					{entries.map((entry) => (
						<li key={entry.id}>
							<button
								type="button"
								className={cx(styles.tocLink, activeId === entry.id && styles.active)}
								onClick={() => onJump(entry.id)}
							>
								{entry.label}
							</button>
						</li>
					))}
				</ul>
			</nav>
		</aside>
	);
};
