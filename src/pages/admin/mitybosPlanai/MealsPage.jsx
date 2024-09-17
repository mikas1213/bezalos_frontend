import { useState, useEffect } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import Meals from '../../../components/admin/nutrition_plans/meals/Meals';
const MealsPage = () => {
    const axiosPrivate = useAxiosPrivate();
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            try {
                const sum = (acc, val) => acc + val;
                const { data } = await axiosPrivate.get('/admin/plans/meals');

                setMeals(() => {
                    data.map(meal => {
                        meal.products.map(prod => prod.b = prod.b_100 * prod.grams / 100);
                        meal.products.map(prod => prod.a = prod.a_100 * prod.grams / 100);
                        meal.products.map(prod => prod.r = prod.r_100 * prod.grams / 100);

                        meal.b = meal.products.map(prod => prod.b).reduce(sum, 0);
                        meal.a = meal.products.map(prod => prod.a).reduce(sum, 0);
                        meal.r = meal.products.map(prod => prod.r).reduce(sum, 0);
                        meal.kcal = (meal.b * 4) + (meal.a * 4) + (meal.r * 9);
                    });
                    
                    return [...data];
                });
                setIsLoading(false);
            } catch (err) {
                console.log(err.message)
            }
        };
        getData();
    }, [axiosPrivate]);

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

    const handleMealProductEdit = async (id, value, meal_id, prod_title, grams, b_100, a_100, r_100) => {
        try {
            const sum = (acc, val) => acc + val;
            const currentMeals = [...meals];
            const currMealIndex = currentMeals.findIndex(meal => meal.id === meal_id);

            const currentProduct = currentMeals[currMealIndex].products.find(prod => prod.id === id);
            const currProdIndex = currentMeals[currMealIndex].products.findIndex(prod => prod.id === id);
            
            currentProduct.product_id = value;
            currentProduct.title = prod_title;

            currentProduct.b = +b_100 * grams / 100;
            currentProduct.a = +a_100 * grams / 100;
            currentProduct.r = +r_100 * grams / 100;
            
            currentProduct.b_100 = +b_100;
            currentProduct.a_100 = +a_100;
            currentProduct.r_100 = +r_100;
            currentMeals[currMealIndex].products[currProdIndex] = currentProduct;


            const b_sum = currentMeals[currMealIndex].products.map(prod => prod.b).reduce(sum, 0);
            const a_sum = currentMeals[currMealIndex].products.map(prod => prod.a).reduce(sum, 0);
            const r_sum = currentMeals[currMealIndex].products.map(prod => prod.r).reduce(sum, 0);

            currentMeals[currMealIndex].b = b_sum;
            currentMeals[currMealIndex].a = a_sum;
            currentMeals[currMealIndex].r = r_sum;
            currentMeals[currMealIndex].kcal = (b_sum * 4) + (a_sum * 4) + (r_sum * 9);
            
            setMeals([...currentMeals]);

            await axiosPrivate.patch('admin/plans/meal/product', {id, value, meal_id, column: 'product_id'});
        } catch (err) {
            console.log(err.message);
        }
    };

    const handleMealProductGramsEdit = async (event, id, value, meal_id) => {
        try {
            const sum = (acc, val) => acc + val;
            const currentMeals = [...meals];
            const currMealIndex = currentMeals.findIndex(meal => meal.id === meal_id);

            const currentProduct = currentMeals[currMealIndex].products.find(prod => prod.id === id);
            const currProdIndex = currentMeals[currMealIndex].products.findIndex(prod => prod.id === id);
            
            if(!isNaN(value)) {
                currentProduct.b = currentProduct.b_100 * value / 100;
                currentProduct.a = currentProduct.a_100 * value / 100;
                currentProduct.r = currentProduct.r_100 * value / 100;
                currentProduct.grams = value;
                
                currentMeals[currMealIndex].products[currProdIndex] = currentProduct;


                const b_sum = currentMeals[currMealIndex].products.map(prod => prod.b).reduce(sum, 0);
                const a_sum = currentMeals[currMealIndex].products.map(prod => prod.a).reduce(sum, 0);
                const r_sum = currentMeals[currMealIndex].products.map(prod => prod.r).reduce(sum, 0);

                currentMeals[currMealIndex].b = b_sum;
                currentMeals[currMealIndex].a = a_sum;
                currentMeals[currMealIndex].r = r_sum;
                currentMeals[currMealIndex].kcal = (b_sum * 4) + (a_sum * 4) + (r_sum * 9);

                setMeals([...currentMeals]);

                if(event === 'blur' || event === 'submit') {
                    await axiosPrivate.patch('admin/plans/meal/product', {id, value, meal_id, column: 'grams'});
                }
            }
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <div>
            {!isLoading && <Meals 
                meals={meals} 
                handleMealUpdate={handleMealUpdate} 
                handleMealDelete={handleMealDelete}
                handleMealProductEdit={handleMealProductEdit}
                handleMealProductGramsEdit={handleMealProductGramsEdit}
            />}
        </div>
    );
};

export default MealsPage;