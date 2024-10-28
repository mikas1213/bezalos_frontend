import { useState } from 'react';
import  { useOutletContext } from 'react-router-dom';
import { useUserPlans } from '../../hooks/profile/useUserPlans';
import Plans from '../../components/profilis/mitybos_planas/Plans';
import No_Plans from '../../components/profilis/no_mitybos_planas/No_Plans';
import { usePlanProducts } from '../../hooks/profile/usePlanProducts';

const UserPlansPage = () => {
    const { user_id, is_subscription } = useOutletContext();
    const { plans, isLoading } = useUserPlans(user_id);
    const [topPosition, setTopPosition] = useState(0);
    const [isShowChageProdList, setIsShowChageProdList] = useState(false);
    const [clickedProd, setClickedProd] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const { prodList } = usePlanProducts(is_subscription);

    const onChangeProduct = (e, isClickedSameProduct, meal_logic, product) => {     
        const prod = e.target.closest('[class*=plans]').getBoundingClientRect();
        const btn = e.target.getBoundingClientRect();
        setTopPosition(btn.top-prod.top+btn.height+10);
        setIsShowChageProdList(prevState => prevState && isClickedSameProduct ? false : true);

        setFilteredProducts(prodList.filter(prod => prod.category === product.category));
        
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
                        is_subscription={is_subscription} 
                        onChangeProduct={onChangeProduct}
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