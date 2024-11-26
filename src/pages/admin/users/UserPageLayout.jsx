import { Outlet } from 'react-router-dom';
import UserNav from '../../../components/admin/user/UserNav';
import { useUserInfo } from '.././../../hooks/nutrition_plans_hooks/useUserInfo';
import { useParams } from 'react-router-dom';

const UserPageLayout = () => {
    const { id: user_id } = useParams();
    const { user, setUser, selectedPlan, setSelectedPlan, isLoading } = useUserInfo(user_id);
    
    return (
        <div style={{paddingBottom: '10rem'}}>
            <UserNav />
            {!isLoading && <Outlet context={{ user, setUser, selectedPlan, setSelectedPlan }} />}
        </div>
    );
};

export default UserPageLayout;