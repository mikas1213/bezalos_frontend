import { useEffect } from 'react';
import { useAuth } from '../../features/auth';
import Main from '../../components/UI/Main';
import Videos from '../../components/virtuve/Videos';

const VirtuvePage = () => {
    useEffect(() => {
        document.body.style.backgroundColor = '#fff';
        document.title = 'Be žalos | Virtuvė';
    }, []);

    const { user }  = useAuth();
    const user_id = user?.user_id || null;
    const user_role = user?.user_role || null;
    const u_status = user?.u_status || null;
    const s_status = user?.s_status || null;
    const is_course = user?.is_course || null;

    return (
        <>
            <Main>
                <Videos
                    user_id={user_id}
                    user_role={user_role}
                    u_status={u_status}
                    s_status={s_status}
                    is_course={is_course}
                />
            </Main>
        </>
    );
};

export default VirtuvePage;
