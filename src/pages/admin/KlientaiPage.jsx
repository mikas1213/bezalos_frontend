import { useState, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Klientai from "../../components/admin/klientai/Klientai";
import KlientaiRow, { KlientaiRowHeader } from '../../components/admin/klientai/KlientaiRow';

const KlientaiPage = () => {
    const [users, setUsers] = useState([]);
    const [sort, setSort] = useState({
        column: 'subscription_expires',
        value: 'ASC'
    });
    const [isLoading, setIsLoading] = useState(true);
    const axiosPrivate = useAxiosPrivate();
    
    useEffect(() => {
        const getData = async () => {
            try {
                const data = await axiosPrivate.get(`/admin/users?column=${sort.column}&sort=${sort.value}`);
                const changedUsers = [...data.data.users];
                
                setUsers(changedUsers);
                setIsLoading(false);
            } catch (err) {
                console.log(err);
            }
        }
        getData();
    }, [sort, axiosPrivate]);


    
    return (
        <Klientai>
            <KlientaiRowHeader setSort={setSort} sort={sort}/>
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