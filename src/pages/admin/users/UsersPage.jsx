import { useState } from 'react';
import { useUsers } from '../../../hooks/nutrition_plans_hooks/useUsers';
import UserRow from '../../../components/admin/users/UserRow';
import UserHeaderRow from '../../../components/admin/users/UserHeaderRow';
import Pagination from '../../../components/UI/Pagination';
import toast from 'react-hot-toast';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';

const UsersPage = () => {
    const axiosPrivate = useAxiosPrivate();
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState({
        column: 's_subscription_expires',
        sort: 'ASC',
        week: false,
        month: false,
        maintenance: false,
        service: false
    });
    const { users, setUsers, isLoading, totalPages } = useUsers(currentPage, search, sort);
    const handleSubscriptionUpdate = async (user_id, value, stripe_type) => {
        
        setUsers(prevState => prevState.map(user => user.id === user_id ? {
            ...user,
            subscription_type: stripe_type ? 'Virtuvė' : value ? 'Virtuvė' : 'free',
            subscription_expires: value
        } : user));

        try {
            value ||= null;
            await axiosPrivate.patch(`/admin/user/${user_id}`, {
                value,
                stripe_type,
                column: 'subscription_expires'
            });
            
        } catch (err) {
            toast.error('Klaida!', {
                icon: <span style={{fontSize: '1.6rem'}}>😬</span>
            });
        }
    };

    const handleUserUpdate = async (user_id, column, value) => {
        setUsers(prevState => prevState.map(user => user.id === user_id ? {
            ...user,
            [column]: value
        } : user));
        try {
            await axiosPrivate.patch(`/admin/user/${user_id}`, {
                column, 
                value: value === '' ? null : value
            });
        } catch (err) {
            toast.error('Klaida!\n'+err.response.data.message, {
                icon: <span style={{fontSize: '1.6rem'}}>😬</span>
            });
        }
    };
    
    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
            <UserHeaderRow  
                setSearch={setSearch} 
                search={search} 
                sort={sort} 
                setSort={setSort} 
                setCurrentPage={setCurrentPage}
                usersEmailsForCopy={users.map(user => user.email).join('\n')}
            />

            {!isLoading && users.map(user => <UserRow 
                key={user.id} 
                user={user} 
                handleSubscriptionUpdate={handleSubscriptionUpdate}
                handleUserUpdate={handleUserUpdate}
            />)}

            <Pagination 
                pagesLimit={7}
                setCurrentPage={setCurrentPage} 
                currentPage={currentPage} 
                totalPages={totalPages} 
            />
        </div>
    );
};

export default UsersPage;