import { CircleX, Search } from 'lucide-react';

import signatureImg from '../../../../../../assets/images/homepage/signature.webp';

import styles from './RecipesHeader.module.scss';

interface RecipesHeaderProps {
	search: string;
	setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export const RecipesHeader = ({ search, setSearch }: RecipesHeaderProps) => {
	return (
		<section className={styles.recipesHeader}>
			<div className={styles.headerInner}>
				<div className={styles.headerText}>
					<h1>
						Receptai, kurie maitina, <span>o ne riboja</span>
					</h1>
					<p>Paprasti, sotūs ir subalansuoti patiekalai — su aiškiais makrosais ir laiku.</p>
				</div>

				<div className={styles.headerSearch}>
					<div className={styles.searchContainer}>
						<Search className={styles.searchIcon} />
						<input
							type="text"
							value={search}
							onChange={(e) => {
								setSearch(e.target.value);
							}}
							className={styles.searchInput}
							placeholder="Ieškok recepto ar ingrediento…"
						/>
						{search && (
							<button
								type="button"
								className={styles.searchClear}
								aria-label="Išvalyti paiešką"
								onClick={() => setSearch('')}
							>
								<CircleX className={styles.iconClear} />
							</button>
						)}
						<button type="button" className={styles.searchBtn}>
							Ieškoti
						</button>
					</div>
				</div>
			</div>

			<img className={styles.signatureImg} src={signatureImg} alt="Signature" />
		</section>
	);
};
