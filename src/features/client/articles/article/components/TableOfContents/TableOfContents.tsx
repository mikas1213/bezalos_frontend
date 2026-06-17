import type { TocEntry } from '../../hooks';

interface TableOfContentsProps {
	entries: TocEntry[];
	activeId: string | null;
	onJump: (id: string) => void;
}

export const TableOfContents = ({ entries, activeId, onJump }: TableOfContentsProps) => {
	if (entries.length === 0) return null;

	return (
		<aside className="bz-toc">
			<nav className="bz-toc-inner">
				<span className="bz-toc-title">Turinys</span>
				<ul className="bz-toc-list">
					{entries.map((entry) => (
						<li key={entry.id}>
							<button
								type="button"
								className={`bz-toc-link${activeId === entry.id ? ' active' : ''}`}
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
