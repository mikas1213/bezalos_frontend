import cx from 'classnames';

import { useTags } from '../../../../../../hooks/tagsHooks/useTags';

import type { HeaderProps } from './types';

import styles from './Header.module.scss';
export const Header = ({
	selectedCategory,
	selectedTag,
	searchQuery,
	videosTotal,
	videosDisplayed,
	onCategoryChange,
	onTagChange,
	onSearchChange,
}: HeaderProps) => {
	const { data, isPending } = useTags('virtuve');

	const { categories, tags } = data ?? { categories: [], tags: [] };
	const categoryClasses = cx(styles.filter, styles.categoryBtn);
	const tagClasses = cx(styles.filter, styles.tagBtn);

	return (
		<div className={styles.header}>
			<div className={styles.titleRow}>
				<div>
					<h1 className={styles.title}>Visi įrašai</h1>
					<p className={styles.count}>
						Rodoma {videosDisplayed} iš {videosTotal} įrašų
					</p>
				</div>
				<div className={styles.search}>
					<input
						type="text"
						placeholder="Ieškoti..."
						value={searchQuery}
						onChange={(e) => onSearchChange(e.target.value)}
					/>
				</div>
			</div>

			<div className={styles.filters}>
				<button
					type="button"
					className={cx(categoryClasses, selectedCategory === null && styles.active)}
					onClick={() => {
						onCategoryChange(null);
						onTagChange(null);
						onSearchChange('');
					}}
				>
					Visi
				</button>

				{!isPending &&
					categories.map((category) => (
						<button
							type="button"
							key={category}
							className={cx(categoryClasses, selectedCategory === category && styles.active)}
							onClick={() => onCategoryChange(category)}
						>
							{category}
						</button>
					))}

				<div className={styles.separator} />

				{!isPending &&
					tags.map((tag) => (
						<button
							type="button"
							key={tag}
							className={cx(tagClasses, selectedTag === tag && styles.active)}
							onClick={() => onTagChange(tag)}
						>
							{tag}
						</button>
					))}
			</div>
		</div>
	);
};
