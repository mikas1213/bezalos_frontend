import { useState, useEffect } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import Navbar from '../../../components/admin/nutrition_plans/meals/Navbar';
import Meals from '../../../components/admin/nutrition_plans/meals/Meals';
import { bar } from '../../../utils/calculationsHelpers';
import toast from 'react-hot-toast';

const MealsPage = () => {
    const axiosPrivate = useAxiosPrivate();
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filters, setFilters] = useState({});
    
    useEffect(() => {
        const getData = async (signal) => {
            
            try {
                let query = '';
                if(Object.keys(filters).length) query = '?' + new URLSearchParams(filters).toString();
            
                const sum = (acc, val) => acc + val;
                const { data } = await axiosPrivate.get(`/admin/plans/meals${query}`, { signal });

                const currentMeals = data ? data.map(meal => {
                    ['b', 'a', 'r'].forEach(char => {
                        meal.products.map(prod => prod[char] = bar(prod[`${char}_100`], prod.grams))
                        meal[char] = meal.products.map(prod => prod[char]).reduce(sum, 0)
                    });
                    return meal;    
                }) : [];
                setMeals([...currentMeals]);
                setIsLoading(false);
            } catch (err) {
                console.log(err.message)
            }
        };
        const controller = new AbortController();
        getData(controller.signal);
        return () => controller.abort();
    }, [axiosPrivate, filters]);

    const handleMealAdd = async () => {
        try {
            const { data: { new_meal_id } } = await axiosPrivate.post('admin/plans/meals');
            setMeals(prevState => [{
                id: new_meal_id,
                logic: '-',
                products: [],
                title: '-',
                b: 0, a: 0, r:0
            }, ...prevState]);
            
        } catch (err) {
            toast.error('Valgis neprisidėjo!');
        }
    };

    const handleMealUpdate = async (meal_id, column, value) => {
        const index = meals.findIndex(v => v.id === meal_id);
        const currentMeals = [...meals];
        currentMeals[index][column] = value;
        setMeals([...currentMeals]);
        
        try {
            await axiosPrivate.patch('admin/plans/meals', {meal_id, column, value});
        } catch (err) {
            console.log(err.message);
        }
    }
    
    const handleMealDelete = async meal_id => {
        try {
            
            await axiosPrivate.delete('admin/plans/meals', {data: {meal_id}});
            setMeals(prevState => ([
                ...prevState.filter(meal => meal.id !== meal_id)
            ]));
        } catch (err) {
            console.log(err.message);
        }
    };

    const handleMealProductAdd = async (new_prod) => {
        try {
            const {data: {data: {id: new_prod_id }}} = await axiosPrivate.post('admin/plans/meal/product', new_prod);

            setMeals(prevMeals => ([
                ...prevMeals.map(meal => meal.id === new_prod.meal_id ? {
                    ...meal,
                    products: [...meal.products, {
                        id: new_prod_id,
                        product_id: new_prod.value, 
                        meal_id: new_prod.meal_id,
                        title: new_prod.label,
                        b: 0, b_100: new_prod.b_100, 
                        a: 0, a_100: new_prod.a_100, 
                        r: 0, r_100: new_prod.r_100, 
                        grams: '',
                        isGramsFocus: true
                    }],
                } : meal)
            ]));

        } catch (err) {
            toast.error('Klaida!\nProduktas nebuvo pridėtas');
        }
    };
    
    const handleMealProductEdit = async (e_type, id, meal_id, title, prod_id, grams, b_100, a_100, r_100) => {
        try {
            if(!isNaN(grams)) {
                const sum = (acc, val) => acc + val;
                setMeals(prevMeals => ([
                    ...prevMeals.map(meal => meal.id === meal_id ? {
                        ...meal,
                        products: meal.products.map(prod => prod.id === id ? {
                            ...prod, grams, title, product_id: prod_id,
                            b_100, b: bar(b_100, grams), 
                            a_100, a: bar(a_100, grams),
                            r_100, r: bar(r_100, grams),
                        } : prod),
                        b: meal.products.map(prod => prod.id === id ? bar(b_100, grams) : prod.b).reduce(sum, 0),
                        a: meal.products.map(prod => prod.id === id ? bar(a_100, grams) : prod.a).reduce(sum, 0),
                        r: meal.products.map(prod => prod.id === id ? bar(r_100, grams) : prod.r).reduce(sum, 0),
                    } : meal)
                ]));   

            
                if(e_type !== 'change') {
                    await axiosPrivate.patch('admin/plans/meal/product', {id, prod_id, grams});
                }
            }
        } catch (err) {
            console.log(err.message);
        }
    };

    const handleMealProductDelete = async (id, meal_id) => {

        try {
            const sum = (acc, val) => acc + val;
            setMeals(prevMeals => ([
                ...prevMeals.map(meal => meal.id === meal_id ? {
                    ...meal,
                    products: meal.products.filter(prod => prod.id !== id),
                    b: meal.products.filter(prod => prod.id !== id).map(prod => prod.b).reduce(sum, 0),
                    a: meal.products.filter(prod => prod.id !== id).map(prod => prod.a).reduce(sum, 0),
                    r: meal.products.filter(prod => prod.id !== id).map(prod => prod.r).reduce(sum, 0),
                } : meal)
            ]));
            await axiosPrivate.delete('admin/plans/meal/product', {data: {id}});
        } catch (err) {
            toast.error('kažkas negerai 🤔');
        }
    };

    return (
        <>
            <Navbar handleMealAdd={handleMealAdd} setFilters={setFilters} />
            {!isLoading && <Meals
                meals={meals} 
                handleMealAdd={handleMealAdd}
                handleMealUpdate={handleMealUpdate} 
                handleMealDelete={handleMealDelete}
                handleMealProductAdd={handleMealProductAdd}
                handleMealProductEdit={handleMealProductEdit}
                handleMealProductDelete={handleMealProductDelete}
            />}
        </>
    );
};

export default MealsPage;