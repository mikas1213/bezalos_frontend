import { useOutletContext } from 'react-router-dom';
import BendraInfo from '../../../components/admin/user/anketa/BendraInfo';
import DabartiniaiIprociai from '../../../components/admin/user/anketa/DabartiniaiIprociai';
import NaujiIprociai from '../../../components/admin/user/anketa/NaujiIprociai';
import { useEffect } from 'react';

const UserAnketaPage = () => {
    const { user } = useOutletContext();
    
    useEffect(() => {
        document.body.style.overflowX = 'auto';

        // const mediaQuery_576 = window.matchMedia('(max-width: 576px)');
        // const applyMediaQueryStyles = () => {
        //     if (mediaQuery_576.matches) {
        //         setFlexDirection('column');
        //     } else {
        //         setFlexDirection('row');
        //     }
        // }
        // mediaQuery_576.addEventListener('change', applyMediaQueryStyles);
        // applyMediaQueryStyles();

        // return () => {
        //     mediaQuery_576.removeEventListener('change', applyMediaQueryStyles);
        //     document.body.style.overflowX = 'hidden';
        // };
    }, []);
    
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: '0.8fr 1.2fr' ,
            gridTemplateRows: '1fr auto',
            gap: '1rem'
        }}>

            <BendraInfo anketa={user.anketa[0]} user={{user_name: user.name, user_email: user.email, stripe_username: user.stripe_username}} />
            <DabartiniaiIprociai anketa={user.anketa[0]} />
            <NaujiIprociai anketa={user.anketa[0]} />
            
        </div>
    );
};

export default UserAnketaPage;