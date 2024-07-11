import usePayment from '../../../hooks/usePayment';

import NarysteDeskotop from './desktop/NarysteDeskotop';
import Features from './desktop/Features';
import Plans from './desktop/Plans';
import PlanCard from './desktop/PlanCard';
import ChooseBtn from './desktop/ChooseBtn';

// import NarysteMobile from './mobile/NarysteMobile';


const Naryste = () => {
    
    const { plan } = usePayment();

    return (
        <>
            <NarysteDeskotop>
                <Features />
                <Plans>
                    <PlanCard  planVariant='profilis' plan={plan.profilis} />
                    <PlanCard  planVariant='virtuve' plan={plan.virtuve} />
                </Plans>
                <ChooseBtn />
            </NarysteDeskotop>

            {/* <NarysteMobile /> */}
            
        </>
    );
};

export default Naryste;
