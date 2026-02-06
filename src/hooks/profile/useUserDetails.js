import { useAxiosPrivate } from '../../features/auth';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

const defaultAnketa = {
    gender: 'Moteris',
    age: '',
    height: '',
    weight: '',
    activity_steps: '',
    goal: '',
    schedule: '',
    feeding: false,
    feeding_desc: '',
    health_problems: false,
    health_problems_desc: '',
    diet: false,
    diet_desc: '',
    intolerance: false, 
    intolerance_desc: '',
    breakfast: false,
    breakfast_time: '--:--',
    breakfast_desc: '',
    lunch: false,
    lunch_time: '--:--',
    lunch_desc: '',
    snack: false,
    snack_time: '--:--',
    snack_desc: '',
    dinner: false,
    dinner_time: '--:--',
    dinner_desc: '',
    routines: {
        workday: [{
            day_id: uuidv4(),
            eat: 'Galiu valgyti betkada', 
            get_up: '--:--', 
            go_sleep: '--:--', 
            sport: '--:--',
            breakfast_time: '--:--',
            lunch_time: '--:--',
            snack_time: '--:--',
            dinner_time: '--:--'
        }],
        day_off: [{
            day_id: uuidv4(),
            eat: 'Galiu valgyti betkada', 
            get_up: '--:--', 
            go_sleep: '--:--', 
            sport: '--:--',
            breakfast_time: '--:--',
            lunch_time: '--:--',
            snack_time: '--:--',
            dinner_time: '--:--'
        }]
    }, 
    nadditional_info: ''
};

export const useUserDetails = (user_id) => {
    const axiosPrivate = useAxiosPrivate();
    const [plans, setPlans] = useState([]);
    const [selectedPlan, setSelectedPlan] = useState(plans[0]);
    const [anketa, setAnketa] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [logicFilter, setLogicFilter] = useState('');
    const [searchRecipe, setSearchRecipe] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await axiosPrivate.get(`/profile/${user_id}`);
                const { plans: user_plans } = data[0];
                const { anketa } = data[0];
                delete anketa[0]?.id;

                setPlans(user_plans);
                setSelectedPlan(user_plans[0] || null)
                
                setAnketa(() => anketa.length > 0 ? ({
                    ...anketa[0],
                    age: String(anketa[0].age),
                    height: String(anketa[0].height),
                    weight: String(anketa[0].weight),
                    activity_steps: String(anketa[0].activity_steps),
                }) : defaultAnketa);

                setRecipes(data[0].recipes);
                setIsLoading(false);
            } catch (err) {
                toast.error('Klaida!\n'+err.response.data.message);
                setIsLoading(false);
            }
        };

        getData();
    }, [axiosPrivate, user_id, logicFilter]);


     /* P A G I N A T I O N */
    const recipesPerPage = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const [paginatedRecipes, setPaginatedRecipes] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    
    useEffect(() => {
        const filteredRecipes = recipes.filter(recipe => logicFilter ? recipe.logic === logicFilter : recipe)
        .filter(recipe => !searchRecipe.trim() ? true : recipe.title.toLowerCase().includes(searchRecipe.trim().toLowerCase()));
        
        if (filteredRecipes.length > 0) {

            const total = Math.ceil(filteredRecipes.length / recipesPerPage);
            setTotalPages(total);
                        
            const indexOfLastRecipe = currentPage * recipesPerPage;
            const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
            const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
            setPaginatedRecipes(currentRecipes);
        } else {
            setPaginatedRecipes([]); 
            setTotalPages(0);
        }
    }, [recipes, currentPage, logicFilter, searchRecipe]);


    return { 
        plans, 
        selectedPlan, 
        setPlans, 
        setSelectedPlan, 
        anketa, 
        setAnketa, 
        recipes, 
        setRecipes, 
        logicFilter,
        setLogicFilter,
        searchRecipe,
        setSearchRecipe,
        isLoading,

        /* PAGINATION RETURNS */
        currentPage,
        totalPages,
        paginatedRecipes,
        setPaginatedRecipes,
        setCurrentPage
    }
};