import { useCallback, useMemo, useState } from 'react';

import type { MacroLogic, UserRecipe } from '../types';

export const RECIPES_PER_PAGE = 4;

/** '' reiškia „visi receptai“. */
export type RecipeLogicFilter = MacroLogic | '';

/**
 * Receptų filtras pagal logiką, paieška pagal pavadinimą ir puslapiavimas.
 * Viskas skaičiuojama iš `recipes` per `useMemo`, be papildomos būsenos ir efektų.
 * Pakeitus filtrą ar paiešką puslapis grįžta į pirmą; sumažėjus sąrašui puslapis apkerpamas iki paskutinio.
 */
export const useRecipeFilters = (recipes: UserRecipe[]) => {
	const [logicFilter, setLogicFilterState] = useState<RecipeLogicFilter>('');
	const [search, setSearchState] = useState('');
	const [currentPage, setCurrentPage] = useState(1);

	const setLogicFilter = useCallback((value: RecipeLogicFilter) => {
		setLogicFilterState(value);
		setCurrentPage(1);
	}, []);

	const setSearch = useCallback((value: string) => {
		setSearchState(value);
		setCurrentPage(1);
	}, []);

	const filteredRecipes = useMemo(() => {
		const query = search.trim().toLowerCase();
		return recipes
			.filter((recipe) => !logicFilter || recipe.logic === logicFilter)
			.filter((recipe) => !query || recipe.title.toLowerCase().includes(query));
	}, [recipes, logicFilter, search]);

	const totalPages = Math.ceil(filteredRecipes.length / RECIPES_PER_PAGE);
	const page = Math.min(currentPage, Math.max(totalPages, 1));

	const paginatedRecipes = useMemo(() => {
		const end = page * RECIPES_PER_PAGE;
		return filteredRecipes.slice(end - RECIPES_PER_PAGE, end);
	}, [filteredRecipes, page]);

	return {
		logicFilter,
		setLogicFilter,
		search,
		setSearch,
		currentPage: page,
		setCurrentPage,
		totalPages,
		paginatedRecipes,
	};
};
