import usePayment from '../../../hooks/usePayment';

import { jwtDecode } from 'jwt-decode';
import useAuth from '../../../hooks/useAuth';

import NarysteDeskotop from './desktop/NarysteDeskotop';
import Features from './desktop/Features';
import Plans from './desktop/Plans';
import PlanCard from './desktop/PlanCard';
import ChooseBtn from './desktop/ChooseBtn';
import ManageSubscription from './desktop/ManageSubscription';

const Naryste = () => {
    const { plan } = usePayment();
    const { auth } = useAuth();
    let loggedUser = {};
    if (auth.accessToken) loggedUser = jwtDecode(auth?.accessToken);
    const { user_s_subscription} = loggedUser;
    console.log('loggedUser', loggedUser)
    return (
        <>
            <NarysteDeskotop>
                <Features />
                <Plans>
                    <PlanCard  planVariant='profilis' plan={plan.profilis} />
                    <PlanCard  planVariant='virtuve' plan={plan.virtuve} />
                </Plans>
                {!user_s_subscription ? <ChooseBtn key={Math.random()}/> : <ManageSubscription />}
            </NarysteDeskotop>
        </>
    );
};

export default Naryste;
