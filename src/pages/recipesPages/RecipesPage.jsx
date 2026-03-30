import { useState } from 'react';

import { axiosPrivate } from '../../api/axios';
import Filters from '../../components/receptai/filters/Filters';
import RecipesHeader from '../../components/receptai/filters/RecipesHeader';
import InfoTab from '../../components/receptai/InfoTab';
import FavoriteRecipes from '../../components/receptai/receptai/FavoriteRecipes';
import Recipes from '../../components/receptai/receptai/Recipes';
import Container from '../../components/UI/Container';
import Main from '../../components/UI/Main';
import Pagination from '../../components/UI/Pagination';
import { useMediaQuery } from '../../contexts/MediaQueryProvider';
import { useAuth } from '../../features/auth';
import { useFavoriteRecipes } from '../../hooks/recipes/useFavoriteRecipes';
import { useRecipes } from '../../hooks/recipes/useRecipes';

const RecipesPage = () => {
	const mediaQuery = useMediaQuery();

	const [isOpenFilters, setIsOpenFilters] = useState(false);
	const [filters, setFilters] = useState({});
	const [search, setSearch] = useState('');
	const { user, setIsOpenModal } = useAuth();
	const user_id = user?.user_id ?? null;

	const { isLoading, recipes, setRecipes, currentPage, setCurrentPage, totalPages, totalRows } = useRecipes(
		{
			...filters,
			...(search !== '' ? { search } : {}),
		},
		user_id,
	);

	const { data: mostLiked, isLoading: isLoadingFav } = useFavoriteRecipes();
	const onToggleLikes = async (recipe_id) => {
		if (!user_id) {
			setIsOpenModal(true);
		} else {
			const { data } = await axiosPrivate.post(`/likes/recipe`, { entity_id: recipe_id, category: 'recipes' });
			setRecipes((prevState) =>
				prevState.map((recipe) =>
					recipe.id === recipe_id
						? {
								...recipe,
								liked: data.isLiked,
								likes: data.likesCount,
							}
						: recipe,
				),
			);
		}
	};

	return (
		<>
			<RecipesHeader
				isOpenFilters={isOpenFilters}
				setIsOpenFilters={setIsOpenFilters}
				search={search}
				setSearch={setSearch}
				setCurrentPage={setCurrentPage}
			/>

			<Main page="recipes">
				<Container>
					<FavoriteRecipes mostLiked={mostLiked} isLoading={isLoadingFav} />
					<Filters
						isOpenFilters={isOpenFilters}
						mediaQuery={mediaQuery}
						filters={filters}
						setFilters={setFilters}
						setCurrentPage={setCurrentPage}
					/>
					<InfoTab recipesCount={totalRows} />
					<Recipes isLoading={isLoading} recipes={recipes} onToggleLikes={onToggleLikes} />
					{!isLoading && (
						<>
							{totalPages > 0 && (
								<Pagination
									setCurrentPage={setCurrentPage}
									currentPage={currentPage}
									totalPages={totalPages}
									pagesLimit={mediaQuery < 441 ? 3 : 5}
								/>
							)}
						</>
					)}
				</Container>
			</Main>
		</>
	);
};

export default RecipesPage;
