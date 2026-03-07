import styles from './Header.module.scss';

interface HeaderProps {
	categories: string[];
	tags: string[];
	selectedCategory: string | null;
	selectedTag: string | null;
	searchQuery: string;
	totalCount: number;
	filteredCount: number;
	onCategoryChange: (category: string | null) => void;
	onTagChange: (tag: string) => void;
	onSearchChange: (query: string) => void;
}

export const Header = ({
	categories,
	tags,
	selectedCategory,
	selectedTag,
	searchQuery,
	totalCount,
	filteredCount,
	onCategoryChange,
	onTagChange,
	onSearchChange,
}: HeaderProps) => {
	return (
		<div className={styles.header}>
			<div className={styles.titleRow}>
				<h1 className={styles.title}>Visi įrašai</h1>
				<p className={styles.count}>
					Rodoma {filteredCount} iš {totalCount} įrašų
				</p>
			</div>
			<div className={styles.filters}>
				<button
					className={`${styles.filterBtn} ${selectedCategory === null ? styles.active : ''}`}
					onClick={() => onCategoryChange(null)}
				>
					Visi
				</button>
				{categories.map(category => (
					<button
						key={category}
						className={`${styles.filterBtn} ${selectedCategory === category ? styles.active : ''}`}
						onClick={() => onCategoryChange(category)}
					>
						{category}
					</button>
				))}
				<div className={styles.separator} />
				{tags.map(tag => (
					<button
						key={tag}
						className={`${styles.filterBtn} ${selectedTag === tag ? styles.active : ''}`}
						onClick={() => onTagChange(tag)}
					>
						{tag}
					</button>
				))}
				<div className={styles.search}>
					<input
						type="text"
						placeholder="Ieškoti..."
						value={searchQuery}
						onChange={e => onSearchChange(e.target.value)}
					/>
				</div>
			</div>
		</div>
	);
};
