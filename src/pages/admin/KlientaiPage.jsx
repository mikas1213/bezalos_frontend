import { useState, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Klientai from "../../components/admin/klientai/Klientai";
import KlientaiRow, { KlientaiRowHeader } from '../../components/admin/klientai/KlientaiRow';
// import { isDateBeforeFive } from '../../utils/helpers';

const KlientaiPage = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const axiosPrivate = useAxiosPrivate();

    // const five_days_before = new Date();
    // five_days_before.setDate(five_days_before.getDate() - 5);

    // const returnColor = (date1, date2) => {
    //     let setColor = '';
    //     if(Date.parse(date1) > Date.parse(date2)) setColor = 'colorWarning';
    //     if(Date.parse(date1) > Date.now()) setColor = 'colorDanger';
    //     return setColor;
    // };


    useEffect(() => {
        const getData = async () => {
            try {
                const data = await axiosPrivate.get('/admin/users');
                const changedUsers = [...data.data.users];
                // changedUsers.map(user => {
                //     user.mityba_seka = Date.parse(user.nutrition_tracking) <= Date.parse(new Date().toLocaleString('lt-LT', {dateStyle: 'short'})) ? 'colorDanger' : ''
                //     user.naryste_galioja = isDateBeforeFive(user.subscription_expires, 'naryste_galioja');
                // })
                
                setUsers(changedUsers);
                setIsLoading(false);
            } catch (err) {
                console.log(err);
            }
        }
        getData();
    }, []);
    
    return (
        <Klientai>
            <KlientaiRowHeader />
            {!isLoading && users.map(user => <KlientaiRow 
                key={user.id} 
                user={user} 
                users={users}
                setUsers={setUsers}
            />)}
        </Klientai>
    );
};

export default KlientaiPage;