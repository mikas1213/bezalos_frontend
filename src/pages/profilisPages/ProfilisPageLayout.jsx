import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Outlet } from 'react-router-dom';

import { useQueryClient } from '@tanstack/react-query';

import ProfileNavbar from '../../components/profilis/ProfileNavbar';
import Container from '../../components/UI/Container';
import { useAuth } from '../../features/auth';
import { useProducts } from '../../features/client/profilis/hooks/useProducts';
import { useProfile } from '../../features/client/profilis/hooks/useProfile';
import { useRecipeFilters } from '../../features/client/profilis/hooks/useRecipeFilters';
import { getErrorMessage } from '../../features/client/profilis/utils/getErrorMessage';
import { setProfileRecipes } from '../../features/client/profilis/utils/profileCache';

/** @typedef {import('../../features/client/profilis/types').UserPlan} UserPlan */
/** @typedef {import('../../features/client/profilis/types').UserRecipe} UserRecipe */
/** @typedef {import('../../features/client/profilis/types').AnketaForm} AnketaForm */

/**
 * Pereinamoji versija (refaktoringo 2 žingsnis): duomenys jau iš React Query, bet Outlet kontekstas dar toks pat.
 * 3 žingsnyje receptų filtras keliasi į ManoReceptaiPage, 4 žingsnyje šį failą pakeičia ProfilisLayout.tsx.
 */
const ProfilisPageLayout = () => {
    useEffect(() => {
        document.body.style.backgroundColor = '#fff';
        document.title = 'Be žalos | Profilis';

        return () => {
            document.body.style.backgroundColor = ''; // atstato pradinę spalvą
        };
    }, []);

    const { user } = useAuth();
    const user_id = user?.user_id;
    const user_role = user?.user_role;
    const is_subscription = user?.user_s_subscription || user?.user_subscription;

    const queryClient = useQueryClient();
    const { products: prodList, error: productsError } = useProducts();
    const { plans, recipes, anketa: savedAnketa, isLoading, error: profileError } = useProfile(user_id);

    // Tie patys klaidų toast'ai kaip senuose hook'uose. 4 žingsnyje keičiami į klaidos būseną su „Bandyti dar kartą“.
    useEffect(() => {
        if (profileError) toast.error('Klaida!\n' + getErrorMessage(profileError));
    }, [profileError]);

    useEffect(() => {
        if (productsError) toast.error('Klaida!\n' + getErrorMessage(productsError));
    }, [productsError]);

    /* selectedPlan lieka layout'e (žr. plano sprendimus). Kol vartotojas nepasirinko ar nepakeitė plano, rodomas pirmas. */
    const [selectedPlanState, setSelectedPlanState] = useState(/** @type {UserPlan | null} */ (null));
    const selectedPlan = selectedPlanState ?? plans[0] ?? null;
    const setSelectedPlan = useCallback(
        /** @param {import('react').SetStateAction<UserPlan | null>} action */
        (action) => {
            setSelectedPlanState((prev) => (typeof action === 'function' ? action(prev ?? plans[0] ?? null) : action));
        },
        [plans],
    );

    /* Anketos juodraštis: kol AnketaPage jo neperėmė (4 žingsnis), gyvena čia. Kol neredaguota, rodoma išsaugota anketa. */
    const [anketaDraft, setAnketaDraft] = useState(/** @type {AnketaForm | null} */ (null));
    const anketa = anketaDraft ?? savedAnketa;
    const setAnketa = useCallback(
        /** @param {import('react').SetStateAction<AnketaForm>} action */
        (action) => {
            setAnketaDraft((prev) => {
                if (typeof action !== 'function') return action;
                const base = prev ?? savedAnketa;
                return base ? action(base) : prev;
            });
        },
        [savedAnketa],
    );

    /** Vaikai receptus keičia tiesiai cache'e; 3 žingsnyje tai perims useCreateRecipe / useDeleteRecipe. */
    const setRecipes = useCallback(
        /** @param {import('react').SetStateAction<UserRecipe[]>} action */
        (action) => {
            if (!user_id) return;
            setProfileRecipes(queryClient, user_id, (prev) => (typeof action === 'function' ? action(prev) : action));
        },
        [queryClient, user_id],
    );

    /* Receptų filtras ir puslapiavimas: 3 žingsnyje šis hook'as keliasi į ManoReceptaiPage, čia tik dėl seno konteksto. */
    const {
        logicFilter,
        setLogicFilter,
        search: searchRecipe,
        setSearch: setSearchRecipe,
        currentPage,
        setCurrentPage,
        totalPages,
        paginatedRecipes,
    } = useRecipeFilters(recipes);

    return (
        <>
            <Container>
                <ProfileNavbar />
            </Container>
            {!isLoading && <Outlet context={{
                user_role,
                is_subscription,
                prodList,
                plans,
                selectedPlan,
                setSelectedPlan,
                anketa,
                setAnketa,
                recipes,
                setRecipes,
                user_id,
                logicFilter,
                setLogicFilter,
                searchRecipe,
                setSearchRecipe,
                isLoading,
                /* PAGINATION RETURN */
                currentPage,
                totalPages,
                paginatedRecipes,
                /* Pereinamasis shim'as: ManoReceptaiPage per jį tik nuima isNew žymes, todėl updater'is taikomas visam sąrašui cache'e. */
                setPaginatedRecipes: setRecipes,
                setCurrentPage
            }} />}
        </>
    );
};

export default ProfilisPageLayout;
