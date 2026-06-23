import { useEffect, useState } from 'react';

import Container from '../../../../../components/UI/Container';
import Main from '../../../../../components/UI/Main';
import { useAuth } from '../../../../auth';
import { Filters, InfoTab, RecipesHeader, RecipesList } from '../components';
import type { RecipeFilters } from '../hooks/useRecipes';
import { useRecipes } from '../hooks/useRecipes';

const RecipesPage = () => {
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

	return (
		<>
			<RecipesHeader search={search} setSearch={setSearch} />

			<Main page="recipes">
				<Container>
					<Filters filters={filters} setFilters={setFilters} />
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
