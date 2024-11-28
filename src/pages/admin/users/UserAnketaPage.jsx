import { useOutletContext } from 'react-router-dom';
import BendraInfo from '../../../components/admin/user/anketa/BendraInfo';
import DabartiniaiIprociai from '../../../components/admin/user/anketa/DabartiniaiIprociai';
import NaujiIprociai from '../../../components/admin/user/anketa/NaujiIprociai';

const UserAnketaPage = () => {
    const { user } = useOutletContext();
    
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: '0.8fr 1.2fr' ,
            gridTemplateRows: '1fr auto',
            gap: '1rem',
            // height: '100vh'
        }}>

            <BendraInfo anketa={user.anketa[0]} />
            <DabartiniaiIprociai anketa={user.anketa[0]} />
            <NaujiIprociai anketa={user.anketa[0]} />
            
        </div>
    );
};

export default UserAnketaPage;