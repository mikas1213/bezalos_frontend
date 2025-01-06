import styles from './AssignPlan.module.css';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
import { default as UsersSelect } from 'react-select/async';
import { useState } from 'react';
import UserDetails from '../../user/edit_plan/UserDetails';

const customUsersLoadStyles = {
    container: (provider) => ({
        ...provider
    }),
    control: (provider, state) => ({
        ...provider,
        borderRadius: 20,
        borderWidth: '1px',
        '&:hover': { cursor: 'pointer', 
            borderColor: !state.isFocused ? '#ccc' : '#245D6B', 
            boxShadow: !state.isFocused ? '#ccc' : '#245D6B'
        },
        boxShadow: state.isFocused ? '#245D6B' : '#ddd',
        borderColor: state.isFocused ? '#245D6B' : '#ddd',
        minHeight: 0,
        width: 350
    }),
    valueContainer: (provider) => ({
        ...provider,
        minHeight: 0,
        height: 60
    }),
    singleValue: (provider) =>({
        ...provider,
        color: '#999',
        minHeight: 0,
        fontSize: 18
    }),
    input: (provider) => ({
        ...provider,
        minHeight: 0,
        color: '#999',
        fontSize: 18
    }),
    placeholder: (provided) => ({
        ...provided,
        color: '#999',
        fontSize: '24px'
    }),    
    menu: (provider) => ({
        ...provider,
        marginTop: 5,
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
    }),
    option: (provider, state) => ({
        ...provider,
        fontSize: 13,
        fontWeight: 500,
        padding: '3px 5px 3px 5px',
        borderBottom: '0.5px solid #ccc',
        backgroundColor: state.isFocused ? '#245D6B' : '#fff',
        color: state.isFocused ? '#fff' : '#245D6B',
        '&:hover': { cursor: 'pointer', 
            backgroundColor: '#245D6B',
            boxShadow: '#245D6B'
        }
    })
}

const AssignPlan = ({ user, setUser, assignPlanToUser, isPlanAssigning }) => {
    const axiosPrivate = useAxiosPrivate();
    const [isMenuOpen, setIsMenuOpen] = useState('');
    const [userDetails, setUserDetails] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    
    const loadUsersOptions = async (inputValue, callback) => {
        try {
            if(inputValue && inputValue.length > 2) {
                const resp = await axiosPrivate.get(`/admin/users?search=${inputValue.toLowerCase()}`);
                const options = resp.data.map(user => ({
                    label: (<div style={{display: 'flex', flexDirection: 'column', gap: '0.1rem'}}>
                        <span style={{color: '#999', fontSize: '1rem'}}>{user.stripe_username || user.name}</span>
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'end'}}>
                            <span style={{fontWeight: '700', fontSize: '0.9rem'}}>{user.email}</span>
                            <span style={{fontSize: '12px'}}>({user.name})</span>
                        </div>
                    </div>),
                    value: user.id,
                    name: user.name,
                    email: user.email,
                    stripe_username: user.stripe_username,
                    initial_target: user.initial_target
                }));
                callback(options);
            }
        } catch (err) {
            callback([]);
        }
    };

    const onHandleChange = async e => {
        setUser(e);
        
        try {
            const { data } = await axiosPrivate.get(`/admin/user/${e.value}`);
            setUserDetails(data);
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
        }
    };
    
    return (
        <div className={styles.assignPlan}>
            <UsersSelect
                components={{ DropdownIndicator: null, IndicatorSeparator: null, LoadingIndicator: null }}
                cacheOptions
                menuPosition='fixed'
                maxMenuHeight={700}
                isSearchable={true}
                loadOptions={loadUsersOptions} 
                defaultOptions={false}
                loadingMessage={() => null}
                menuIsOpen={isMenuOpen.length > 2}
                styles={customUsersLoadStyles}
                onInputChange={setIsMenuOpen}
                onChange={onHandleChange}
                value={user}
            />

            <button disabled={isPlanAssigning}
                className={styles.assignPlanBtn}
                onClick={() => {
                    // localStorage.removeItem('localPlan');
                    assignPlanToUser();
            }}>Priskirti</button>
            {!isLoading && <UserDetails userDetails={userDetails} />}
        </div>
    );
};

export default AssignPlan;