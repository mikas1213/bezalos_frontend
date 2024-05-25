import { useState, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

import Klientai from "../../components/admin/klientai/Klientai";
import KlientaiRow, { KlientaiRowHeader } from '../../components/admin/klientai/KlientaiRow';

const KlientaiPage = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await axiosPrivate.get('/admin/users');
                const changedUsers = [...data.data.users];
                changedUsers.map(user => user.mityba_seka = Date.parse(user.nutrition_tracking) >= Date.now())
                
                setUsers([...changedUsers]);
                setIsLoading(false);
            } catch (err) {
                console.log(err);
            }
        }
        getData();
    }, [axiosPrivate]);

    return (
        <Klientai>
            <KlientaiRowHeader />
            {!isLoading && users.map(user => <KlientaiRow 
                key={user.id} 
                user={user} 
                users={users}
                onSetUsers={setUsers}
            />)}
        </Klientai>
    );
};

export default KlientaiPage;