import { useState } from 'react';

import Header from '../../../../components/profilis/mano_receptai/header/Header';
import LogicFilter from '../../../../components/profilis/mano_receptai/header/LogicFilter';
import NewRecipeBtn from '../../../../components/profilis/mano_receptai/header/NewRecipeBtn';
import SearchRecipe from '../../../../components/profilis/mano_receptai/header/SearchRecipe';
import No_recipes from '../../../../components/profilis/mano_receptai/No_recipes';
import RecipeModal from '../../../../components/profilis/mano_receptai/recipe_modal/RecipeModal';
import RecipeList from '../../../../components/profilis/mano_receptai/user_recipes/RecipeList';
import Container from '../../../../components/UI/Container';
import Pagination from '../../../../components/UI/Pagination';
import Spinner from '../../../../components/UI/Spinner';
import HowItWorks from '../components/HowItWorks/HowItWorks';
import { useDeleteRecipe } from '../hooks/useDeleteRecipe';
import { useProfile } from '../hooks/useProfile';
import { useProfilisContext } from '../hooks/useProfilisContext';
import { type RecipeLogicFilter, useRecipeFilters } from '../hooks/useRecipeFilters';

const filterOptions: { value: RecipeLogicFilter; label: string; color: string }[] = [
	{ value: 'A+B', label: 'A+B', color: '#30c040' },
	{ value: 'B+R', label: 'B+R', color: '#245D6B' },
	{ value: 'A+R', label: 'A+R', color: '#ec9f11' },
];

const ManoReceptaiPage = () => {
	const { userId, isSubscribed } = useProfilisContext();
	const { recipes, isLoading } = useProfile(userId);
	const { logicFilter, setLogicFilter, search, setSearch, currentPage, setCurrentPage, totalPages, paginatedRecipes } =
		useRecipeFilters(recipes);
	const deleteRecipe = useDeleteRecipe(userId);

	const [open, setOpen] = useState(false);
	/** Ką tik sukurto recepto id: tik jis gauna „naujo“ animaciją, o išėjus iš puslapio žymė dingsta savaime. */
	const [newRecipeId, setNewRecipeId] = useState<string | null>(null);

	const visibleRecipes = paginatedRecipes.map((recipe) => ({ ...recipe, isNew: recipe.id === newRecipeId }));

	return (
		<>
			<HowItWorks title="Receptų sudarymas" tutorial_link="https://youtu.be/sJUk-HCbcZ8" />
			{!isSubscribed ? (
				<Container>
					<No_recipes />
				</Container>
			) : isLoading ? (
				<Container>
					<Spinner />
				</Container>
			) : (
				<Container>
					<Header>
						<NewRecipeBtn setOpen={setOpen} />
						<LogicFilter options={filterOptions} setFilter={logicFilter} onSetFilter={setLogicFilter} />
						<SearchRecipe searchRecipe={search} setSearchRecipe={setSearch} />
						{open && <RecipeModal setOpen={setOpen} onCreated={setNewRecipeId} />}
					</Header>
					<RecipeList recipes={visibleRecipes} handleDeleteRecipe={(recipeId: string) => deleteRecipe.mutate(recipeId)} />
					{totalPages > 1 && (
						<Pagination
							totalPages={totalPages}
							currentPage={currentPage}
							setCurrentPage={setCurrentPage}
							pagesLimit={5}
							color="var(--color-btn-secondary)"
						/>
					)}
				</Container>
			)}
		</>
	);
};

export default ManoReceptaiPage;
