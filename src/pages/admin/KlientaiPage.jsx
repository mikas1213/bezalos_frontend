import { useState, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Klientai from "../../components/admin/klientai/Klientai";
import KlientaiRow, { KlientaiRowHeader } from '../../components/admin/klientai/KlientaiRow';

const KlientaiPage = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState({
        column: 's_subscription_expires',
        value: 'ASC'
    });
    const [isLoading, setIsLoading] = useState(true);
    const axiosPrivate = useAxiosPrivate();
    
    // useEffect(() => {
    //     const getData = async () => {
    //         try {
    //             const data = await axiosPrivate.get(`/admin/users?column=${sort.column}&sort=${sort.value}`);
    //             const changedUsers = [...data.data.users];
                            
    //             setUsers(changedUsers);
    //             setIsLoading(false);
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     }
    //     getData();
    // }, [sort, axiosPrivate]);

    useEffect(() => {
        const getData = async () => {
            
            try {
                const data = await axiosPrivate.post('/admin/users', {column: sort.column, sort: sort.value});
                const changedUsers = [...data.data.users];
                            
                setUsers(changedUsers);
                setIsLoading(false);
            } catch (err) {
                console.log(err);
            }
        }
        getData();
    }, [sort, axiosPrivate]);

    
    const searchFn = u => {
        return u.email.toLowerCase().indexOf(search) > -1 || 
        u.name.toLowerCase().indexOf(search) > -1 || 
        u.last_activity.toLowerCase().indexOf(search) > -1;
    };
    
    return (
        <Klientai>
            <KlientaiRowHeader setSearch={setSearch} search={search} sort={sort} setSort={setSort} />
            {!isLoading && users.filter(searchFn).map(user => <KlientaiRow 
                key={user.id} 
                user={user} 
                users={users}
                setUsers={setUsers}
            />)}
        </Klientai>
    );
};

export default KlientaiPage;