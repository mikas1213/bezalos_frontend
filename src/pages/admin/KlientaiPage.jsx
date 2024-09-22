import { useState, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import UsersContainer from '../../components/admin/users/UsersContainer';
import UserRow from '../../components/admin/users/UserRow';
import UserHeaderRow from '../../components/admin/users/UserHeaderRow';

const KlientaiPage = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState({
        column: 's_subscription_expires',
        sort: 'ASC',
        week: false,
        month: false,
        maintenance: false
    });
    
    const [isLoading, setIsLoading] = useState(true);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        const getData = async () => {
            
            try {
                const data = await axiosPrivate.post('/admin/users', sort);
                const changedUsers = [...data.data.users];
                                
                setUsers(changedUsers);
                setIsLoading(false);
            } catch (err) {
                console.log(err);
            }
        }
        getData();
    }, [sort, axiosPrivate]);

    const searchFn = user => {
        return user.email.toLowerCase().indexOf(search) > -1 || 
        user.name.toLowerCase().indexOf(search) > -1 || 
        user.last_activity?.toLowerCase()?.indexOf(search) > -1;
    };

    const onChangeUsers = newUser => {

        const currentUsers = [...users];
        const currentUser = currentUsers.find(u => u.id === newUser.user_id);
        const index = currentUsers.findIndex(u => u.id === newUser.user_id);
        currentUsers[index] = {...currentUser, ...newUser};
        
        setUsers(currentUsers)
    };
    
    return (
        <UsersContainer>
            <UserHeaderRow  
                setSearch={setSearch} 
                search={search} 
                sort={sort} 
                setSort={setSort} 
                usersEmailsForCopy={users.map(user => user.email).join('\n')}
            />
            {!isLoading && users.filter(searchFn).map(user => <UserRow 
                key={user.id} 
                user={user} 
                onChangeUsers={onChangeUsers}
            />)}
        </UsersContainer>
    );
};

export default KlientaiPage;