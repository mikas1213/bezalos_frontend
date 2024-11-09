import { useState } from 'react';
import  { useOutletContext } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Plans from '../../components/profilis/mitybos_planas/Plans';
import No_Plans from '../../components/profilis/no_mitybos_planas/No_Plans';
import toast from 'react-hot-toast';
import { bar, kcal, set_grams } from '../../utils/calculationsHelpers';

const UserPlansPage = () => {
    const axioxPrivate = useAxiosPrivate();
    const { is_subscription, prodList, plans, selectedPlan, setSelectedPlan, isLoading } = useOutletContext();

    const [topPosition, setTopPosition] = useState(0);
    const [isShowChageProdList, setIsShowChageProdList] = useState(false);
    const [clickedProd, setClickedProd] = useState({m_id: '', p_id: ''});
    const [filteredProducts, setFilteredProducts] = useState([]);
    
    const onChangeProduct = (e, isClickedSameProduct, meal_logic, product) => {    
        const prod = e.target.closest('[class*=plans]').getBoundingClientRect();
        const btn = e.target.getBoundingClientRect();
        setTopPosition(btn.top - prod.top + btn.height + 10);
        setIsShowChageProdList(prevState => prevState && isClickedSameProduct ? false : true);

        setFilteredProducts(() => prodList.filter(prod => {
            
            if(product.category.indexOf('baltymai') > -1) {
                return prod.category === product.category && prod.sub_category === product.sub_category;
            } else if(product.category === 'Vaisiai/uogos' && meal_logic === 'A+R') {
                return prod.category === product.category || (prod.category === 'Angliavandeniai' && prod.sub_category === 'uzkandis');
            } else {
                return prod.category === product.category; 
            }
        }));
    };
    
    const onUpdateProduct = async (updatedProd) => {
        
        try {  
            await axioxPrivate.patch(`/profile/products/${selectedPlan.id}/${clickedProd.p_id}`, {...updatedProd, grams: set_grams(clickedProd, updatedProd)});
            setSelectedPlan(prevState => ({
                ...prevState, 
                b: Math.round(prevState.meals.filter(meal => !meal.is_sport).map(meal => meal.products.map(prod => prod.id === clickedProd.p_id ? bar(updatedProd.proteins, set_grams(prod, updatedProd)) : bar(prod.b_100, prod.grams)).reduce((acc, val) => acc + val, 0)).reduce((acc, val) => acc + val, 0)),
                a: Math.round(prevState.meals.filter(meal => !meal.is_sport).map(meal => meal.products.map(prod => prod.id === clickedProd.p_id ? bar(updatedProd.carbs, set_grams(prod, updatedProd)) : bar(prod.a_100, prod.grams)).reduce((acc, val) => acc + val, 0)).reduce((acc, val) => acc + val, 0)),
                r: Math.round(prevState.meals.filter(meal => !meal.is_sport).map(meal => meal.products.map(prod => prod.id === clickedProd.p_id ? bar(updatedProd.fat, set_grams(prod, updatedProd)) : bar(prod.r_100, prod.grams)).reduce((acc, val) => acc + val, 0)).reduce((acc, val) => acc + val, 0)),
                kcal: Math.round(kcal(
                    prevState.meals.filter(meal => !meal.is_sport).map(meal => meal.products.map(prod => prod.id === clickedProd.p_id ? bar(updatedProd.proteins, set_grams(prod, updatedProd)) : bar(prod.b_100, prod.grams)).reduce((acc, val) => acc + val, 0)).reduce((acc, val) => acc + val, 0),
                    prevState.meals.filter(meal => !meal.is_sport).map(meal => meal.products.map(prod => prod.id === clickedProd.p_id ? bar(updatedProd.carbs, set_grams(prod, updatedProd)) : bar(prod.a_100, prod.grams)).reduce((acc, val) => acc + val, 0)).reduce((acc, val) => acc + val, 0),
                    prevState.meals.filter(meal => !meal.is_sport).map(meal => meal.products.map(prod => prod.id === clickedProd.p_id ? bar(updatedProd.fat, set_grams(prod, updatedProd)) : bar(prod.r_100, prod.grams)).reduce((acc, val) => acc + val, 0)).reduce((acc, val) => acc + val, 0)
                )),
                meals: prevState.meals.map(meal => meal.id === clickedProd.m_id ? {
                    ...meal,
                    b: Math.round(meal.products.map(prod => prod.id === clickedProd.p_id ? bar(updatedProd.proteins, set_grams(prod, updatedProd)) : bar(prod.b_100, prod.grams)).reduce((acc, val) => acc + val, 0)),
                    a: Math.round(meal.products.map(prod => prod.id === clickedProd.p_id ? bar(updatedProd.carbs, set_grams(prod, updatedProd)) : bar(prod.a_100, prod.grams)).reduce((acc, val) => acc + val, 0)),
                    r: Math.round(meal.products.map(prod => prod.id === clickedProd.p_id ? bar(updatedProd.fat, set_grams(prod, updatedProd)) : bar(prod.r_100, prod.grams)).reduce((acc, val) => acc + val, 0)),
                    kcal: Math.round(kcal(
                        meal.products.map(prod => prod.id === clickedProd.p_id ? bar(updatedProd.proteins, set_grams(prod, updatedProd)) : bar(prod.b_100, prod.grams)).reduce((acc, val) => acc + val, 0),
                        meal.products.map(prod => prod.id === clickedProd.p_id ? bar(updatedProd.carbs, set_grams(prod, updatedProd)) : bar(prod.a_100, prod.grams)).reduce((acc, val) => acc + val, 0),    
                        meal.products.map(prod => prod.id === clickedProd.p_id ? bar(updatedProd.fat, set_grams(prod, updatedProd)) : bar(prod.r_100, prod.grams)).reduce((acc, val) => acc + val, 0)
                    )),
                    products: meal.products.map(prod => prod.id === clickedProd.p_id ? {
                        ...prod,
                        b_100: updatedProd.proteins,
                        a_100: updatedProd.carbs,
                        r_100: updatedProd.fat,
                        grams: set_grams(prod, updatedProd),
                        title: updatedProd.title,
                    } : prod)
                } : meal)
            }));
        } catch (err) {
            if(err.status === 402) {
                toast.error(err.response.statusText);
            } else {
                toast.error('Klaida:\n'+err.response.data.message);
            }
        }
    };

    return (
        <>
            <div style={{
                marginBottom: '3rem',
                display: 'flex',
                justifyContent: 'center'
            }}>

                {isLoading ? null : (
                    plans.length > 0 ? <Plans 
                        plans={plans} 
                        selectedPlan={selectedPlan}
                        setSelectedPlan={setSelectedPlan}
                        is_subscription={is_subscription} 
                        onChangeProduct={onChangeProduct}
                        onUpdateProduct={onUpdateProduct}
                        topPosition={topPosition}
                        isShowChageProdList={isShowChageProdList}
                        setIsShowChageProdList={setIsShowChageProdList}
                        setClickedProd={setClickedProd}
                        clickedProd={clickedProd}
                        filteredProducts={filteredProducts}
                    /> : <No_Plans />)
                }
                                
            </div>
            <div style={{color: 'var(--color-bgr-top)', marginBottom: '0.5rem', textAlign: 'center'}}>Be žalos | bezalos.lt</div>
        </>
    );
};

export default UserPlansPage;