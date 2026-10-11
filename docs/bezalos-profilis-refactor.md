# `ProfilisPageLayout` refaktoringas: liesas layout'as, React Query ir perkėlimas į `features/client/profilis`

## Kontekstas

[src/pages/profilisPages/ProfilisPageLayout.jsx](src/pages/profilisPages/ProfilisPageLayout.jsx) šiuo metu yra „dievo layout'as“: pats daro du užklausimus, laiko penkių puslapių būseną ir per `Outlet` kontekstą perduoda 20 laukų. Projektas tuo tarpu jau persikėlė į `features/*` struktūrą su TypeScript, React Query ir klasiniais servisais (pvz. [src/features/client/paslaugos/](src/features/client/paslaugos/)). Katalogas [src/features/client/profilis/](src/features/client/profilis/) jau sukurtas, bet tuščias, o šaka `feature/be-zalos-profile-redesign` ir commit'as `ea7a449` (profile.scss dizaino sistema) rodo, kad profilio perdarymas vyksta dabar.

Tikslas: layout'ą sumažinti iki navbar'o, puslapio meta ir minimalaus tipizuoto konteksto; duomenis perkelti į React Query; receptų būseną nuleisti į patį receptų puslapį; pakeliui ištaisyti rastas klaidas. Darbas skaidomas į šešis savarankiškus žingsnius, po kiekvieno aplikacija veikia ir galima daryti atskirą PR.

### Kas iš dabartinio konteksto realiai naudojama

| Laukas | Naudotojai |
|---|---|
| `user_id` | AnketaPage, StatistikaPage, RecipeModal |
| `is_subscription` | UserPlansPage, ManoReceptaiPage, StatistikaPage, ProduktuKeitimasPage |
| `prodList` | UserPlansPage, ProduktuKeitimasPage, RecipeModal |
| `plans` | UserPlansPage, RecipeModal |
| `selectedPlan`, `setSelectedPlan` | tik UserPlansPage |
| `anketa`, `setAnketa` | tik AnketaPage |
| `setRecipes`, `logicFilter`, `searchRecipe`, puslapiavimas (9 laukai) | tik ManoReceptaiPage |
| `user_role`, `recipes`, `isLoading` | niekas (`isLoading` vaikuose visada `false`) |

### Rastos klaidos, kurias refaktoringas ištaiso

1. **Filtro paspaudimas perkrauna visą profilį.** `logicFilter` yra [useUserDetails.js:100](src/hooks/profile/useUserDetails.js#L100) priklausomybėse, nors filtravimas vyksta kliento pusėje. Perkrovimas perrašo `anketa` ir `selectedPlan`, todėl dingsta neišsaugoti anketos pakeitimai ir produktų keitimai plane.
2. **Paieška neatstato puslapio.** [SearchRecipe.jsx](src/components/profilis/mano_receptai/header/SearchRecipe.jsx) negauna `setCurrentPage`; būnant 3 puslapyje ir susiaurinus paiešką, sąrašas tampa tuščias, o puslapiavimas pasislepia.
3. **Produktų krovimas ignoruojamas.** Layout'o `isLoading` seka tik profilį, [usePlanProducts.js:31](src/hooks/profile/usePlanProducts.js#L31) grąžinamas `isLoading` neskaitomas, todėl puslapiai gali pasirodyti su tuščiu `prodList`.
4. **Klaidos atveju puslapiai rodomi su tuščiais masyvais**, o `err.response.data.message` nulūžta esant tinklo klaidai be `response`.
5. **Mutuojamas serverio atsakas** per `delete anketa[0]?.id` [useUserDetails.js:78](src/hooks/profile/useUserDetails.js#L78); `document.title` neatstatomas.
6. **Kalorijų ir nustatymų puslapiai blokuojami** profilio užklausos, nors jiems duomenų nereikia; krovimo metu po navbar'u tuščia vieta be spinnerio.

### Priimti sprendimai

- **`selectedPlan` lieka layout'o kontekste.** Produktų keitimai plane ([UserPlansPage.jsx:40](src/pages/profilisPages/UserPlansPage.jsx#L40) `onUpdateProduct`) niekur nesiunčiami į serverį ir išgyvena perėjimą tarp skirtukų tik todėl, kad būsena gyvena layout'e. Elgsena nekeičiama.
- **Anketos juodraštis keliasi į `AnketaPage`.** Lokali būsena inicializuojama iš užklausos duomenų. Neišsaugoti pakeitimai perėjus į kitą skirtuką dings, tai standartinė elgsena, o dabartinis „išgyvenimas“ jau sulaužytas 1 klaidos.
- **TS tik naujam kodui.** Layout'as, hook'ai, servisas ir tipai rašomi `.ts/.tsx`. Puslapiai lieka `.jsx` ir konvertuojami tik tada, kai liečiami (3 ir 4 žingsniuose `ManoReceptaiPage`); `AnketaPage` ir `UserPlansPage` konvertuojami atskirai vėliau.

## 1 žingsnis: tipai, servisas ir query raktai

Elgsena nesikeičia, tik atsiranda pamatas. Šablonas: [paslaugosService.ts](src/features/client/paslaugos/services/paslaugosService.ts) ir [virtuve/utils/queryKeys.ts](src/features/client/virtuve/utils/queryKeys.ts).

1. **`src/features/client/profilis/types/index.ts`**: `Product`, `PlanProduct`, `Meal`, `UserPlan`, `UserRecipe`, `Anketa`, `Routine`, `ProfileDto` (atsakymas iš `GET /profile/:id`, forma `[{ plans, anketa, recipes }]`). Laukų pavadinimai paimami iš dabartinio naudojimo `useUserDetails.js`, `UserPlansPage.jsx` (`b_100`, `a_100`, `r_100`, `grams`, `is_sport`) ir `RecipeModal.jsx` (`title`, `logic`, `products`, `b`, `a`, `r`, `kcal`).
2. **`src/features/client/profilis/constants/defaultAnketa.ts`**: `defaultAnketa` ir `createRoutine()` fabrikas. Dabar tas pats objektas dubliuojamas [useUserDetails.js:8-61](src/hooks/profile/useUserDetails.js#L8-L61) ir [AnketaPage.jsx:77-87](src/pages/profilisPages/AnketaPage.jsx#L77-L87).
3. **`src/features/client/profilis/services/profileService.ts`**: klasė `ProfileService` su `axiosPrivate`:
   - `getProfile(userId): Promise<ProfileDto>`;
   - `getProducts(): Promise<Product[]>`;
   - `createRecipe(userId, recipe): Promise<{ recipe_id }>`;
   - `deleteRecipe(recipeId): Promise<void>`;
   - `saveAnketa(userId, anketa): Promise<void>`.

   Body tracking endpoint'ai iš `StatistikaPage` čia nededami, jie bus atskiro refaktoringo dalis.
4. **`src/features/client/profilis/utils/queryKeys.ts`**: `profileKeys.profile(userId)`, `profileKeys.products()`.

## 2 žingsnis: React Query hook'ai vietoj `useEffect`

Šablonas: [usePaslauga.ts](src/features/client/paslaugos/hooks/usePaslauga.ts) (ypač `setPaslauga` per `queryClient.setQueryData`).

1. **`hooks/useProfile.ts`**: `useQuery` su `profileKeys.profile(userId)`, `enabled: !!userId`. `select` normalizuoja atsakymą: paima `data[0]`, anketos skaitinius laukus paverčia į `string`, kai anketos nėra, grąžina `defaultAnketa`; `id` laukas išmetamas per destruktūrizaciją, o ne `delete`. Grąžina `{ plans, anketa, recipes, isLoading, isError, refetch }`.
2. **`hooks/useProducts.ts`**: `useQuery` su `profileKeys.products()` ir `staleTime: 30 * 60 * 1000`, nes produktų sąrašas keičiasi retai.
3. **`hooks/useCreateRecipe.ts`** ir **`hooks/useDeleteRecipe.ts`**: `useMutation`, `onSuccess` atnaujina `recipes` cache per `setQueryData` (naujas receptas į priekį, ištrintas filtruojamas). Klaidų pranešimai lieka tie patys `toast.error` tekstai iš [RecipeModal.jsx:51-56](src/components/profilis/mano_receptai/recipe_modal/RecipeModal.jsx#L51-L56) ir [ManoReceptaiPage.jsx:55-57](src/pages/profilisPages/ManoReceptaiPage.jsx#L55-L57). Tinklo klaida apdorojama per `err.response?.data?.message ?? err.message`.
4. **`hooks/useSaveAnketa.ts`**: `useMutation`, `onSuccess` įrašo išsaugotą anketą į profilio cache. 400 atsakymo logika su `page` ir `field` lieka `AnketaPage`, mutacija tik grąžina klaidą.
5. Senas layout'as pereina ant naujų hook'ų, bet kontekstas kol kas nesikeičia. Ištrinami [src/hooks/profile/useUserDetails.js](src/hooks/profile/useUserDetails.js) ir [src/hooks/profile/usePlanProducts.js](src/hooks/profile/usePlanProducts.js).

## 3 žingsnis: receptų būsena į `ManoReceptaiPage`

1. **`hooks/useRecipeFilters.ts`**: priima `recipes`, viduje laiko `logicFilter`, `search`, `currentPage`. Filtravimas ir puslapiavimas skaičiuojami per `useMemo`, ne per `useEffect` + `useState`. `setLogicFilter` ir `setSearch` abu atstato `currentPage` į 1. `recipesPerPage = 4` lieka. Tai ištaiso 1 ir 2 klaidas.
2. **`ManoReceptaiPage`** konvertuojamas į `.tsx`, naudoja `useProfile`, `useProducts`, `useRecipeFilters`, `useDeleteRecipe`. Iš `Outlet` konteksto ima tik `isSubscribed`.
3. **`isNew` animacija**: vietoj [ManoReceptaiPage.jsx:43-47](src/pages/profilisPages/ManoReceptaiPage.jsx#L43-L47) hack'o, kuris mutuoja puslapiuotą sąrašą, puslapyje laikomas `newRecipeId` lokalioje būsenoje; `RecipeList` gauna `isNew={recipe.id === newRecipeId}`. `RecipeModal` nebegauna `setRecipes` prop'o, o kviečia `useCreateRecipe` ir per `onCreated(id)` praneša puslapiui.
4. `LogicFilter` prop'as `setCurrentPage` tampa nebereikalingas, nes puslapį atstato pats hook'as.

## 4 žingsnis: liesas layout'as

1. **`src/features/client/profilis/layouts/ProfilisLayout.tsx`** pakeičia seną failą. Jame lieka:
   - `usePageMeta` (5 žingsnis) arba kol kas tas pats `useEffect`;
   - `<Container><ProfileNavbar /></Container>`;
   - `useProfile(user.user_id)` tik dėl bendros krovimo ir klaidos būsenos;
   - krovimo metu `Spinner` iš [src/components/UI/Spinner](src/components/UI/Spinner) po navbar'u, klaidos atveju tekstas su mygtuku „Bandyti dar kartą“, kuris kviečia `refetch`;
   - `selectedPlan` būsena per `useState<UserPlan | null>`, sinchronizuojama su `plans[0]` kai profilis pasikrauna (`useEffect` su `plans` priklausomybe, tik jei `selectedPlan` dar `null`);
   - `<Outlet context={...} />` rodomas visada, puslapiai patys sprendžia, ko laukti.
2. **Tipizuotas kontekstas** pagal [AdminLayout.tsx:20](src/components/admin/layout/AdminLayout.tsx#L20) pavyzdį:
   ```ts
   export type ProfilisOutletContext = {
       userId: string;
       isSubscribed: boolean;
       selectedPlan: UserPlan | null;
       setSelectedPlan: Dispatch<SetStateAction<UserPlan | null>>;
   };
   ```
   Šalia **`hooks/useProfilisContext.ts`**: `() => useOutletContext<ProfilisOutletContext>()`, kad puslapiams nereikėtų kartoti generiko.
3. **Puslapių pritaikymas** (minimalūs pakeitimai, failai lieka `.jsx`):
   - `UserPlansPage`: `plans` iš `useProfile`, `prodList` iš `useProducts`, likusieji iš `useProfilisContext()`;
   - `ProduktuKeitimasPage`, `RecipeModal`: `prodList` iš `useProducts`; `RecipeModal` dar ima `plans` iš `useProfile`;
   - `AnketaPage`: `anketa` iš `useProfile` kaip pradinė `formData` reikšmė (`useState(anketa)` + `useEffect`, kuris užpildo, kai duomenys atkeliauja), `submitAnketa` per `useSaveAnketa`;
   - `StatistikaPage`: `userId`, `isSubscribed` iš `useProfilisContext()`;
   - `KalorijosPage`, `NustatymaiPage`: be pakeitimų, tik nebelaukia profilio.
4. Senieji laukai `user_role`, `recipes`, `isLoading` į kontekstą nebededami.

## 5 žingsnis: bendri pagalbininkai

1. **`src/features/auth/core/utils/hasActiveSubscription.ts`**: `(user: UserData | null) => Boolean(user?.user_s_subscription || user?.user_subscription)`, eksportuojamas per [src/features/auth/index.ts](src/features/auth/index.ts). Pakeičia tris kopijas: layout'e, [VirtuveVideoPage.tsx:32](src/features/client/virtuve/pages/VirtuveVideoPage/VirtuveVideoPage.tsx#L32) ir [useSubscriptionCheckout.ts:15](src/features/client/naryste/hooks/useSubscriptionCheckout.ts#L15) (pastarasis dabar tikrina tik `user_s_subscription`, todėl ten paliekamas komentaras arba paliekama kaip yra, jei skirtumas sąmoningas).
2. **`src/hooks/usePageMeta.ts`**: `usePageMeta({ title, background })`, kuris nustato `document.title` ir `document.body.style.backgroundColor`, o unmount'e atstato abu. Pirmiausia naudojamas naujame layout'e; kiti šeši puslapiai (`ArticlesPage`, `ArticlePage`, `PaslaugosPage`, `RecipesPage`, `useRecipe`, `SuccessBuyService`) pereina vėliau, atskiru commit'u.
3. **Pasirinktinai** `src/features/client/profilis/components/SubscriptionGate.tsx` su `fallback` prop'u vietoj keturių vienodų `is_subscription ? <X/> : <NoX/>` ternarų. Daroma tik jei lieka laiko, nes keičia keturis puslapius.

## 6 žingsnis: perkėlimas ir valymas

1. Septyni puslapiai iš [src/pages/profilisPages/](src/pages/profilisPages/) perkeliami į `src/features/client/profilis/pages/`, `ProfileNavbar` ir `HowItWorks` į `src/features/client/profilis/components/`. Likę `src/components/profilis/*` katalogai kol kas lieka vietoje, kad PR nebūtų milžiniškas.
2. [src/App.tsx:48-55](src/App.tsx#L48-L55) importai atnaujinami, o profilio grupė kraunama per `lazy`, kaip kitos kliento feature'ės ([App.tsx:59-74](src/App.tsx#L59-L74)).
3. Ištrinami `src/pages/profilisPages/ProfilisPageLayout.jsx` ir tuščias `src/pages/profilisPages/` katalogas.
4. `git mv` naudojamas perkėlimams, kad išliktų istorija.

## Už šio refaktoringo ribų

- Makroelementų perskaičiavimas [UserPlansPage.jsx:40-80](src/pages/profilisPages/UserPlansPage.jsx#L40-L80) (`onUpdateProduct`), kurį verta iškelti į `utils/recalculatePlan.ts` su testais.
- Anketos validacija [AnketaPage.jsx:102-221](src/pages/profilisPages/AnketaPage.jsx#L102-L221).
- `StatistikaPage` savarankiškas fetch'inimas ir puslapiavimas; jam reikės `useBodyTracking` hook'o ir body tracking metodų servise.
- `AnketaPage` ir `UserPlansPage` konvertavimas į TS.

## Patikrinimas

Po kiekvieno žingsnio:

1. `npm run lint`: be klaidų ir be įspėjimų (`--max-warnings 0`).
2. `npx tsc --noEmit`: be klaidų naujuose `.ts/.tsx` failuose.
3. `npm run dev` ir rankinis sąrašas prisijungus kaip vartotojas su prenumerata:
   - `/profilis`: planas atsidaro, produkto keitimas plane veikia, perėjus į kitą skirtuką ir grįžus keitimas išlikęs;
   - `/profilis/mano-receptai`: filtras A+B / B+R / A+R veikia be tinklo užklausos (React Query Devtools nerodo naujo `fetch`), paieška atstato puslapį į 1, naujas receptas atsiranda viršuje su animacija, ištrynimas pašalina iš sąrašo;
   - `/profilis/anketa`: pradiniai duomenys užpildyti, išsaugojimas rodo toast'ą, 400 klaida nukelia į teisingą žingsnį;
   - `/profilis/produktu-keitimas`: paieška randa produktus iš karto, net jei puslapis atidarytas tiesioginiu URL;
   - `/profilis/kalorijos` ir `/profilis/nustatymai`: atsidaro iš karto, nelaukia profilio;
   - išjungus tinklą ir perkrovus `/profilis`: matomas klaidos tekstas ir mygtukas „Bandyti dar kartą“, o ne tuščias puslapis.
4. Tas pats sąrašas su vartotoju be prenumeratos: visur rodomi `No_*` komponentai.
5. React Query Devtools: `['profile', userId]` ir `['products']` raktai užkraunami po vieną kartą per sesiją, navigacija tarp skirtukų naujų užklausų nekelia.

## Po patvirtinimo

Šis dokumentas išsaugomas repozitorijoje kaip `docs/profilis-layout-refactoring.md`, šalia esamo [docs/backend-frontend-types-merge.md](docs/backend-frontend-types-merge.md). Kodo pakeitimai pradedami tik atskiru nurodymu, nuo 1 žingsnio.
