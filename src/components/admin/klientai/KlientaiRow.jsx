import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import styles from './KlientaiRow.module.css';
import { useState } from 'react';
// import { FaPlus } from "react-icons/fa";
import { date_to_yyyy_mm_dd, isTodayOrFiveDaysBefore, isTodayOrLater, isTwoOrFourWeeks } from '../../../utils/helpers';

const KlientaiRow = ({ user, users, setUsers }) => {
    
    const axiosPrivate = useAxiosPrivate();
    const [userData, setUserDate] = useState({
        subscription_expires: date_to_yyyy_mm_dd(user.subscription_expires),
        nutrition_tracking: date_to_yyyy_mm_dd(user.nutrition_tracking),
        nutrition_plan_status: user.nutrition_plan_status,
        assigned_plan: date_to_yyyy_mm_dd(user.assigned_plan),
        support_over: user.support_over
    });
    
    const onHandleChange = async (e, user_id) => {
        try {
            await axiosPrivate.patch(`/admin/user/${user_id}`, {
                column: e.target.name,
                value: e.target.name !== 'support_over' ? e.target.value : e.target.checked
            });
            
            const newUsers = [...users];
            const newUser = newUsers.find(u => u.id === user_id);
            const index = newUsers.findIndex(u => u.id === user_id);
            
            newUser[e.target.name] = e.target.name !== 'support_over' ? e.target.value : e.target.checked;
            if(e.target.name === 'subscription_expires') {
                newUser.subscription_type = e.target.value ? 'Virtuvė' : 'free'
            }
            
            newUsers[index] = newUser;
            // const compareFn = (a, b) => new Date(b.subscription_expires) - new Date(a.subscription_expires);
            setUsers(newUsers);
        
        } catch (err) {
            console.log(err.message)
        }
    };

    const handleInputChange = (e, user_id) => {
        setUserDate({ ...userData, [e.target.name]: e.target.value });
        onHandleChange(e, user_id);
    };
    
    return (    
        <div className={styles.userRow}>
            <div className={styles.userBox}>
                <div className={styles.email}>{user.email}</div>
                <div className={styles.name}>{user.name}</div>
                <div className={styles.naryste}>
                    <span className={styles[user.subscription_type]}>{user.subscription_type}</span>
                    <input 
                        className={styles[isTodayOrFiveDaysBefore(user.subscription_expires)]}
                        type='date' 
                        min='2024-01-01'                    
                        name='subscription_expires'  
                        value={userData.subscription_expires}
                        onChange={e => handleInputChange(e, user.id)}  
                    />
                </div>
                <div className={styles.lastActivity}>
                    Prisijungė:
                    <span> {date_to_yyyy_mm_dd(user.last_activity)}</span>
                </div>
                
            </div>
        
            <div className={styles.mitybaBox}>
                <div className={styles.mityba}>
                    <span>Mitybą seka iki</span>
                    <input 
                        className={styles[isTodayOrLater(user.nutrition_tracking)]}
                        type='date' 
                        min='2024-01-01'
                        name='nutrition_tracking' 
                        value={userData.nutrition_tracking} 
                        onChange={e => handleInputChange(e, user.id)}  
                    />
                </div>

                <div className={styles.paklausta}>
                    <span>Paklausta</span>
                    <select 
                        className={`${styles.dateSelect} ${user.nutrition_plan_status === 'Tinka' ? styles.colorDanger : styles.colorLight}`}
                        name='nutrition_plan_status' 
                        value={userData.nutrition_plan_status} 
                        onChange={e => handleInputChange(e, user.id)}
                    >
                        <option>Pasirinkti</option>
                        <option>Paklausta</option>
                        <option>Nusiųsta</option>
                        <option>Tinka</option>
                        <option>Trūksta anketos</option>
                    </select>
                </div>
            </div>

            

            <div>
                <input 
                    className={!user.support_over ? styles[isTwoOrFourWeeks(user.assigned_plan)] : styles.colorSuccess}
                    type='date' 
                    name='assigned_plan' 
                    min='2024-01-01'                    
                    value={userData.assigned_plan} 
                    onChange={e => handleInputChange(e, user.id)}  
                />
            </div>

            <div>
                <input 
                    type='checkbox' 
                    name='support_over' 
                    value={userData.support_over} 
                    defaultChecked={userData.support_over} 
                    onChange={e => handleInputChange(e, user.id)}  
                />
            </div>
{/* 
            <div >
                <span>{new Date(Date.parse(user.last_activity)).toLocaleString('lt-LT', { dateStyle: 'short', })}</span>
            </div> */}
        </div>
    );
}

export default KlientaiRow;

export const KlientaiRowHeader = ({ setSort }) => {
    // const handleClick = () => {}

    return (    
        <div className={`${styles.userRow} ${styles.headerRow}`}>
            <div>
                <span onClick={() => setSort(prevSort => {
                    return {column: 'email', value: prevSort.value === 'ASC' ? 'DESC' : 'ASC'}
                })}>Klientas</span>
            </div>

            {/* <div>
                <span onClick={() => setSort(prevSort => {
                    return {column: 'email', value: prevSort.value === 'ASC' ? 'DESC' : 'ASC'}
                })}>El. paštas</span>
            </div> */}

            {/* <div><span>Narystė</span></div> */}

            {/* <div>
                <span onClick={() => setSort(prevSort => {
                    return {column: 'subscription_expires', value: prevSort.value === 'ASC' ? 'DESC' : 'ASC'}
                })}>Galioja iki</span>
            </div> */}

            <div>
                <span onClick={() => setSort(prevSort => {
                    return {column: 'nutrition_tracking', value: prevSort.value === 'ASC' ? 'DESC' : 'ASC'}
                })}>Mitybą seka iki</span>
            </div>
            <div><span>Paklausta</span></div>
            <div>
                <span onClick={() => setSort(prevSort => {
                    return {column: 'assigned_plan', value: prevSort.value === 'ASC' ? 'DESC' : 'ASC'}
                })}>Planas priskirtas</span>
            </div>

            <div>
                <span onClick={() => setSort(prevSort => {
                    return {column: 'support_over', value: prevSort.value === 'ASC' ? 'DESC' : 'ASC'}
                })}>OK</span>
            </div>
        </div>
    );
}

/*
day:
The representation of the day.
Possible values are "numeric", "2-digit".

weekday:
The representation of the weekday.
Possible values are "narrow", "short", "long".

year:
The representation of the year.
Possible values are "numeric", "2-digit".

month:
The representation of the month.
Possible values are "numeric", "2-digit", "narrow", "short", "long".

hour:
The representation of the hour.
Possible values are "numeric", "2-digit".

minute: The representation of the minute.
Possible values are "numeric", "2-digit".

second:
The representation of the second.
Possible values are "numeric", 2-digit".

hour12:
The representation of time format.
Accepts boolean true or false

*/