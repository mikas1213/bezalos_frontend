import { useEffect } from 'react';
import { useAuth } from '../../hooks';
import Main from '../../components/UI/Main';
import Videos from '../../components/virtuve/Videos';

const VirtuvePage = () => {
    useEffect(() => {
        document.body.style.backgroundColor = '#fff';
        document.title = 'Be žalos | Virtuvė';
    }, []);

    const { loggedUser }  = useAuth();
    const user_id = loggedUser?.user_id || null;
    const user_role = loggedUser?.user_role || null;
    const u_status = loggedUser?.u_status || null;
    const s_status = loggedUser?.s_status || null;
    const is_course = loggedUser?.is_course || null;

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
