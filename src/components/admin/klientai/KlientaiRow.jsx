import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import styles from './KlientaiRow.module.css';
import { useState } from 'react';
import { date_to_yyyy_mm_dd, isTodayOrFiveDaysBefore, isTodayOrLater } from '../../../utils/helpers';

const KlientaiRow = ({ user, users, setUsers }) => {
    
    const axiosPrivate = useAxiosPrivate();
    const [userData, setUserDate] = useState({
        subscription_expires: date_to_yyyy_mm_dd(user.subscription_expires),
        nutrition_tracking: date_to_yyyy_mm_dd(user.nutrition_tracking),
        nutrition_plan_status: user.nutrition_plan_status
    });

    const onHandleChange = async (e, user_id) => {
        try {
            await axiosPrivate.patch(`/admin/user/${user_id}`, {
                column: e.target.name,
                value: e.target.value
            });
            
            const newUsers = [...users];
            const newUser = newUsers.find(u => u.id === user_id);
            const index = newUsers.findIndex(u => u.id === user_id);
            
            newUser[e.target.name] = e.target.value;
            if(e.target.name === 'subscription_expires') {
                newUser.subscription_type = e.target.value ? 'Virtuvė' : 'free'
            }
            
            newUsers[index] = newUser;
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
            <div className={styles.name}>{user.name}</div>
            <div className={styles.email}>{user.email}</div>
            <div className={styles.naryste}>
                <span className={user.subscription_type}>{user.subscription_type}</span>
            </div>
            <div className={styles.dateInput}>
                <input 
                    className={styles[isTodayOrFiveDaysBefore(user.subscription_expires)]}
                    type='date' 
                    name='subscription_expires' 
                    value={userData.subscription_expires}
                    onChange={e => handleInputChange(e, user.id)}  
                />
            </div>
            <div className={styles.dateInput}>
                <input 
                    className={styles[isTodayOrLater(user.nutrition_tracking)]}
                    type='date' 
                    name='nutrition_tracking' 
                    value={userData.nutrition_tracking} 
                    onChange={e => handleInputChange(e, user.id)}  
                />
            </div>
            <div>
                <select 
                    className={`${styles.dateSelect} ${user.nutrition_plan_status === 'Tinka' ? styles.colorDanger : ''}`}
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
    );
}

export default KlientaiRow;

export const KlientaiRowHeader = () => {

    return (    
        <div className={`${styles.userRow} ${styles.headerRow}`}>
            <div>Vardas</div>
            <div>El. paštas</div>
            <div>Narystė</div>
            <div>Galioja iki</div>
            <div>Mitybą seka</div>
            <div>Paklausta</div>
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