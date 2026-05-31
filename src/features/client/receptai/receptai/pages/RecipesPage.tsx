import { useEffect, useState } from 'react';

import Container from '../../../../../components/UI/Container';
import Main from '../../../../../components/UI/Main';
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
	const { user } = useAuth();
	const user_id = user?.user_id ?? null;

	useEffect(() => {
		document.body.style.backgroundColor = '#fff';
		document.title = 'Be žalos | Receptai';
	}, []);

	const { isPending, isFetchingNextPage, hasNextPage, fetchNextPage, recipes, totalRows } = useRecipes(
		{
			...filters,
			...(search !== '' ? { search } : {}),
		},
		user_id,
	);

	const { data: mostLiked, isLoading: isLoadingFav } = useFavoriteRecipes();

	return (
		<>
			<RecipesHeader
				isOpenFilters={isOpenFilters}
				setIsOpenFilters={setIsOpenFilters}
				search={search}
				setSearch={setSearch}
			/>

			<Main page="recipes">
				<Container>
					<FavoriteRecipes mostLiked={mostLiked} isLoading={isLoadingFav} />
					<Filters isOpenFilters={isOpenFilters} mediaQuery={mediaQuery} filters={filters} setFilters={setFilters} />
					<InfoTab recipesCount={totalRows} />
					<RecipesList
						isPending={isPending}
						isFetchingNextPage={isFetchingNextPage}
						hasNextPage={hasNextPage}
						recipes={recipes}
						onLoadMore={fetchNextPage}
					/>
				</Container>
			</Main>
		</>
	);
};

export default RecipesPage;
