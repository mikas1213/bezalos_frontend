import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import styles from './KlientaiRow.module.css';
import { useState } from 'react';

const KlientaiRow = ({ user, users, onSetUsers }) => {
    
    // var datee = new Date();
    // datee.setDate(datee.getDate() + 14);
    // console.log(Date.parse(user.assigned_plan) > Date.parse(datee));

    // var datee = new Date(user.assigned_plan);
    // datee.setDate(datee.getDate() + 14);
    // console.log(new Date(Date.parse(user.assigned_plan)).toLocaleString('lt-LT', {dateStyle: 'short'}), ' - - ', datee.toLocaleString('lt-LT', {dateStyle: 'short'}), datee < Date.now())
    

    // const subs_exp_date = user.subscription_expires !== null ? new Date(Date.parse(user.subscription_expires)).toLocaleString('lt-LT', {
    //     year: '2-digit',
    //     month: 'short', 
    //     // weekday: 'short',
    //     day: 'numeric', 
    //     // hour: '2-digit', 
    //     // minute:'2-digit',
    //     // hour12: true,
    //     // dateStyle: 'long', 
    //     // timeStyle: 'short'
    // }) : 'Nepriskirta'

    
    // const isNutritionTrack = Date.parse(user.nutrition_tracking) >= Date.now();
    // const [mitybaSeka, setMitybaSeka] = useState(new Date(user.nutrition_tracking ? user.nutrition_tracking : '').toLocaleString('lt-LT', {year: 'numeric', month: 'short', day: 'numeric'}));
    // const onMitybaSeka = e => {
    //     console.log(e.target.name)
    //     setMitybaSeka(e.target.value);
    // };
    const axiosPrivate = useAxiosPrivate();
    const parseDate = myDate => new Date(Date.parse(myDate)).toLocaleString('lt-LT', {year: 'numeric', month: 'short', day: 'numeric'});
    const [userData, setUserDate] = useState({
        subscription_expires: user.subscription_expires ? parseDate(user.subscription_expires) : '',
        nutrition_tracking: user.nutrition_tracking ? parseDate(user.nutrition_tracking) : '',
        nutrition_plan_status: user.nutrition_plan_status
    });

    const handleChange = e => setUserDate({ ...userData, [e.target.name]: e.target.value });
    const handleBlur = async (e, user_id) => {
        
        try {
            await axiosPrivate.patch(`/admin/user/${user_id}`, {
                column: e.target.name,
                value: e.target.value
            });

            // const newArr = [...users];
            // const index = newArr.findIndex(usr => usr.id === user.id);
            
            // const newUser = newArr.find(v => v.id = user.id);
            // newUser[e.target.name] = e.target.value;
            // newArr[index] = newUser;
            // onSetUsers(newArr);
            // console.log(newArr)
            // onSetUsers(users.map(u =>
            //     u.id === user.id ? { ...u, subscription_expires: e.target.value } : user
            // ));

            
        } catch (err) {
            console.log(err.message)
        }
    };

    const handleChangeSelect = (e, user_id) => {
        handleChange(e);
        handleBlur(e, user_id);
    };
    
    return (    
        <div className={styles.userRow}>
            <div>{user.name}</div>
            <div>{user.email}</div>
            <div className={styles.naryste}>
                <span className={user.subscription_type}>{user.subscription_type}</span>
            </div>
            <div>
                <input 
                    type='date' 
                    name='subscription_expires' 
                    value={userData.subscription_expires}
                    onBlur={e => handleBlur(e, user.id)}
                    onChange={handleChange}
                />
            </div>
            <div className={`${styles.mitybaSeka} ${user.mityba_seka ? styles.seka : ''}`}>
                <input 
                    type='date' 
                    name='nutrition_tracking' 
                    value={userData.nutrition_tracking} 
                    onBlur={e => handleBlur(e, user.id)}
                    onChange={handleChange}
                />
            </div>
            <div>
                <select 
                    name='nutrition_plan_status' 
                    value={userData.nutrition_plan_status} 
                    // onBlur={e => handleBlur(e, user.id)}
                    onChange={e => handleChangeSelect(e, user.id)}
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