import { useOutletContext } from 'react-router-dom';
import { axiosPrivate } from '../../../api/axios';
import EditUserPlan from '../../../components/admin/user/edit_plan/EditUserPlan';
import UserPlans from '../../../components/admin/user/edit_plan/UserPlans';
import UserDetails from '../../../components/admin/user/edit_plan/UserDetails';
import toast from 'react-hot-toast';

import { bar, kcal, mealProdBarSum } from '../../../utils/calculationsHelpers';

const EditUserPlanPage = () => {
    const { user, setUser, selectedPlan, setSelectedPlan } = useOutletContext();


    const onPlanChange = (action, data = {}) => {
        if(action === 'update-plan-title') {
            setUser(prevState => ({...prevState, plans: prevState.plans.map(plan => plan.id === selectedPlan.id ? {...plan, title: data.title} : plan)}));
        } else if(action === 'update-meal-title') {

            const plan_bar_sum_on_meal_change = (meals, data, key) => meals.filter(meal => !meal.is_sport).map(meal => meal.id === data.m_id ? mealProdBarSum(data.products, key) : mealProdBarSum(meal.products, key)).reduce((acc, val) => acc + val, 0);
            setUser(prevState => ({
                ...prevState,
                plans: prevState.plans.map(plan => plan.id === selectedPlan.id ? {
                    ...plan,
                    b: plan_bar_sum_on_meal_change(plan.meals, data, 'b_100'),
                    a: plan_bar_sum_on_meal_change(plan.meals, data, 'a_100'),
                    r: plan_bar_sum_on_meal_change(plan.meals, data, 'r_100'),
                    kcal: kcal(
                        plan_bar_sum_on_meal_change(plan.meals, data, 'b_100'),
                        plan_bar_sum_on_meal_change(plan.meals, data, 'a_100'),
                        plan_bar_sum_on_meal_change(plan.meals, data, 'r_100')
                    ),
                    
                    meals: plan.meals.map(meal => meal.id === data.m_id ? {
                        ...meal,
                        title: data.label,
                        logic: data.logic,
                        intolerance: data.intolerance,
                        b: mealProdBarSum(data.products, 'b_100'),
                        a: mealProdBarSum(data.products, 'a_100'),
                        r: mealProdBarSum(data.products, 'r_100'),
                        kcal: kcal(
                            mealProdBarSum(data.products, 'b_100'),
                            mealProdBarSum(data.products, 'a_100'),
                            mealProdBarSum(data.products, 'r_100')
                        ),
                        products: data.products
                    } : meal)
                } : plan)
            }));

        } else if(action === 'update-meal-time') {

            setUser(prevState => ({
                ...prevState,
                plans: prevState.plans.map(plan => plan.id === selectedPlan.id ? {
                    ...plan,
                    meals: plan.meals.map(meal => meal.id === data.meal_id ? {
                        ...meal,
                        meal_time: data.meal_time
                    } : meal)
                } : plan)
            }));

        } else if(action === 'update-product-title') {
            const plan_bar_sum_on_prod_change = (meals, id, key) => {
                return meals.filter(meal => !meal.is_sport).map(meal => meal.products.map(prod => prod.id === id ? bar(data[key], prod.grams) : bar(prod[key], prod.grams)).reduce((acc, val) => acc + val, 0)).reduce((acc, val) => acc + val, 0);
            }
            const meal_bar_sum_on_prod_change = (meal, id, key) => {
                return meal.products.map(prod => prod.id === id ? bar(data[key], prod.grams) : bar(prod[key], prod.grams)).reduce((acc, val) => acc + val, 0)
            };

            setUser(prevState => ({
                ...prevState,
                plans: prevState.plans.map(plan => plan.id === selectedPlan.id ? {
                    ...plan,
                    
                    b: plan_bar_sum_on_prod_change(plan.meals, data.p_id, 'b_100'),
                    a: plan_bar_sum_on_prod_change(plan.meals, data.p_id, 'a_100'),
                    r: plan_bar_sum_on_prod_change(plan.meals, data.p_id, 'r_100'),
                    kcal: kcal(
                        plan_bar_sum_on_prod_change(plan.meals, data.p_id, 'b_100'),
                        plan_bar_sum_on_prod_change(plan.meals, data.p_id, 'a_100'),
                        plan_bar_sum_on_prod_change(plan.meals, data.p_id, 'r_100')
                    ),
                    meals: plan.meals.map(meal => meal.id === data.m_id ? {
                        ...meal,
                        b: meal_bar_sum_on_prod_change(meal, data.p_id, 'b_100'),
                        a: meal_bar_sum_on_prod_change(meal, data.p_id, 'a_100'),
                        r: meal_bar_sum_on_prod_change(meal, data.p_id, 'r_100'),
                        kcal: kcal(
                            meal_bar_sum_on_prod_change(meal, data.p_id, 'b_100'),
                            meal_bar_sum_on_prod_change(meal, data.p_id, 'a_100'),
                            meal_bar_sum_on_prod_change(meal, data.p_id, 'r_100')
                        ), 
        
                        products: meal.products.map(prod => prod.id === data.p_id ? {
                            ...prod,
                            title: data.label,
                            category: data.category,
                            sub_category: data.sub_category,
                            b_100: data.b_100,
                            a_100: data.a_100,
                            r_100: data.r_100
                        } : prod)
                    } : meal)
                } : plan)
            }));
        } else if(action === 'update-prod-grams') {
            
            const plan_bar_sum_on_gram_change = (meals, data, key) => {
                return meals.filter(meal => !meal.is_sport).map(meal => meal.products.map(prod => (meal.id === data.m_id && prod.id === data.p_id) ? bar(prod[key], data.grams) : bar(prod[key], prod.grams)).reduce((acc, val) => acc + val, 0)).reduce((acc, val) => acc + val, 0);
            };
            const meal_bar_sum_on_gram_change = (products, data, key) => {
                return products.map(prod => prod.id === data.p_id ? bar(prod[key], +data.grams) : bar(prod[key], +prod.grams)).reduce((acc, val) => acc + val, 0);
            };

            setUser(prevState => ({
                ...prevState,
                plans: prevState.plans.map(plan => plan.id === selectedPlan.id ? {
                    ...plan,
                    b: plan_bar_sum_on_gram_change(plan.meals, data, 'b_100'),
                    a: plan_bar_sum_on_gram_change(plan.meals, data, 'a_100'),
                    r: plan_bar_sum_on_gram_change(plan.meals, data, 'r_100'),
                    kcal: kcal(
                        plan_bar_sum_on_gram_change(plan.meals, data, 'b_100'),
                        plan_bar_sum_on_gram_change(plan.meals, data, 'a_100'),
                        plan_bar_sum_on_gram_change(plan.meals, data, 'r_100')
                    ),
                    meals: plan.meals.map(meal => meal.id === data.m_id ? {
                        ...meal,
                        b: meal_bar_sum_on_gram_change(meal.products, data, 'b_100'),
                        a: meal_bar_sum_on_gram_change(meal.products, data, 'a_100'),
                        r: meal_bar_sum_on_gram_change(meal.products, data, 'r_100'),
                        kcal: kcal(
                            meal_bar_sum_on_gram_change(meal.products, data, 'b_100'),
                            meal_bar_sum_on_gram_change(meal.products, data, 'a_100'),
                            meal_bar_sum_on_gram_change(meal.products, data, 'r_100')
                        ),
                        products: meal.products.map(prod => prod.id === data.p_id ? {
                            ...prod,
                            grams: +data.grams.replace(',', '.')
                            } : prod)
                    } : meal)
                } : plan)
            }));
        } else if(action === 'delete-product') {
   
            const plan_bar_sum_on_prod_delete = (meals, data, key) => {
                return meals.map(meal => meal.id === data.m_id ? mealProdBarSum(meal.products.filter(prod => prod.id !== data.p_id), key) : mealProdBarSum(meal.products, key)).reduce((acc, val) => acc + val, 0)
            };
            setUser(prevState => ({
                ...prevState,
                plans: prevState.plans.map(plan => plan.id === selectedPlan.id ? {
                    ...plan,
                    b: plan_bar_sum_on_prod_delete(plan.meals, data, 'b_100'),
                    a: plan_bar_sum_on_prod_delete(plan.meals, data, 'a_100'),
                    r: plan_bar_sum_on_prod_delete(plan.meals, data, 'r_100'),
                    kcal: kcal(
                        plan_bar_sum_on_prod_delete(plan.meals, data, 'b_100'),
                        plan_bar_sum_on_prod_delete(plan.meals, data, 'a_100'),
                        plan_bar_sum_on_prod_delete(plan.meals, data, 'r_100')
                    ), 
                    meals: plan.meals.map(meal => meal.id === data.m_id ? {
                        ...meal,
                        b: mealProdBarSum(meal.products.filter(prod => prod.id !== data.p_id), 'b_100'),
                        a: mealProdBarSum(meal.products.filter(prod => prod.id !== data.p_id), 'a_100'),
                        r: mealProdBarSum(meal.products.filter(prod => prod.id !== data.p_id), 'r_100'),

                        kcal: kcal(
                            mealProdBarSum(meal.products.filter(prod => prod.id !== data.p_id), 'b_100'),
                            mealProdBarSum(meal.products.filter(prod => prod.id !== data.p_id), 'a_100'),
                            mealProdBarSum(meal.products.filter(prod => prod.id !== data.p_id), 'r_100')
                        ),

                        products: meal.products.filter(prod => prod.id !== data.p_id)
                    } : meal)
                } : plan)
            }));

        } else if(action === 'delete-plan') {
            setUser(prevUser => {
                if (!prevUser) return null;
                const updatedPlans = prevUser.plans.filter(plan => plan.id !== selectedPlan.id);
                const newSelectedPlan = updatedPlans.length > 0 ? updatedPlans[0] : null;
              
                setSelectedPlan(newSelectedPlan);
              
                return {
                    ...prevUser,
                    plans: updatedPlans,
                };
            });
        }
    };

    const onPlanUpdate = async (action, actionData) => {

        try {
            actionData.user_id = user.id;
            await axiosPrivate.patch(`/admin/user/plan/${selectedPlan.id}`, {action, actionData});
        } catch (err) {
            let msgTxt = err.response?.data.message || err.message;
            if(err.status === 401 || err.status === 403) msgTxt = 'Prisijungti !!!';
            toast.error(msgTxt)
        }
    }

    return (
        <>
            {user.plans.length > 0 && <UserPlans 
                plans={user.plans} 
                selectedPlan={selectedPlan} 
                setSelectedPlan={setSelectedPlan} 
            />}

            <div style={{ display: 'flex', gap: '1rem'}}>
                {user.plans.length > 0 ? <EditUserPlan 
                    currentUserPlan={user.plans.find(plan => plan.id === selectedPlan.id)}
                    onPlanChange={onPlanChange}
                    onPlanUpdate={onPlanUpdate}
                /> :  

                <div style={{
                    textAlign: 'center',
                    marginTop: '5rem',
                    fontSize: '2.5rem',
                    color: '#999'
                }}>Priskirtų planų nėra</div>}

                <UserDetails userDetails={user} />
            </div> 
        </>
    );
};

export default EditUserPlanPage;
