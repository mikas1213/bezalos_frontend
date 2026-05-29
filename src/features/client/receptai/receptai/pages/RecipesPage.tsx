import { useState } from 'react';

import { axiosPrivate } from '../../../../../api/axios';
import Container from '../../../../../components/UI/Container';
import Main from '../../../../../components/UI/Main';
import Pagination from '../../../../../components/UI/Pagination';
import { useMediaQuery } from '../../../../../contexts/MediaQueryProvider';
import { useAuth } from '../../../../auth';
import { FavoriteRecipes, Filters, InfoTab, RecipesHeader, RecipesList } from '../components';
import { useFavoriteRecipes, useRecipes } from '../hooks';
import type { RecipeFilters } from '../hooks/useRecipes';

const RecipesPage = () => {
	const mediaQuery = useMediaQuery();

	const [isOpenFilters, setIsOpenFilters] = useState(false);
	const [filters, setFilters] = useState<RecipeFilters>({});
	const [search, setSearch] = useState('');
	const { user, setIsOpenModal } = useAuth() as ReturnType<typeof useAuth> & {
		setIsOpenModal: (value: boolean) => void;
	};
	const user_id = user?.user_id ?? null;

	const { isLoading, recipes, setRecipes, currentPage, setCurrentPage, totalPages, totalRows } = useRecipes(
		{
			...filters,
			...(search !== '' ? { search } : {}),
		},
		user_id,
	);

	const { data: mostLiked, isLoading: isLoadingFav } = useFavoriteRecipes();

	const onToggleLikes = async (recipe_id: number) => {
		if (!user_id) {
			setIsOpenModal(true);
		} else {
			const { data } = await axiosPrivate.post<{ isLiked: boolean; likesCount: number }>(`/likes/recipe`, {
				entity_id: recipe_id,
				category: 'recipes',
			});
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
					<RecipesList isLoading={isLoading} recipes={recipes} onToggleLikes={onToggleLikes} />
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
