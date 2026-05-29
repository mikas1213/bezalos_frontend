import { CircleX, Filter, Search } from 'lucide-react';

import signatureImg from '../../../../../../assets/images/homepage/signature.webp';

import styles from './RecipesHeader.module.scss';

interface RecipesHeaderProps {
	isOpenFilters: boolean;
	setIsOpenFilters: React.Dispatch<React.SetStateAction<boolean>>;
	search: string;
	setSearch: React.Dispatch<React.SetStateAction<string>>;
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export const RecipesHeader = ({ isOpenFilters, setIsOpenFilters, search, setSearch, setCurrentPage }: RecipesHeaderProps) => {
	return (
		<div className={styles.recipesHeader}>
			<div className={`${styles.searchContainer} ${isOpenFilters ? styles.filterOpen : ''}`}>
				<input
					type="text"
					value={search}
					onChange={(e) => {
						setSearch(e.target.value);
						setCurrentPage(1);
					}}
					className={styles.searchInput}
					placeholder="Paieška..."
				/>
				<button type="button" className={styles.filterBtn} onClick={() => setIsOpenFilters((open) => !open)}>
					<Filter className={styles.filterIcon} />
				</button>
				<Search className={styles.searchIcon} />

				<CircleX className={styles.iconClear} onClick={() => setSearch('')} />
			</div>
			<img className={styles.signatureImg} src={signatureImg} alt="Signature" />
		</div>
	);
};
