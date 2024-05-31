import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import styles from './KlientaiRow.module.css';
import { useState } from 'react';
import { date_to_yyyy_mm_dd, isTodayOrFiveDaysBefore, isTodayOrLater, isTwoOrFourWeeks } from '../../../utils/helpers';
import check_box_styles from './CheckBox.module.css';
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";
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
                <div className={styles.userBoxName}>
                    <div className={styles.email}>{user.email}</div>
                    <div className={styles.name}>{user.name}</div>
                </div>

                <div className={styles.userBoxDate}>
                    <div className={styles.naryste}>
                        <span className={styles[user.subscription_type]}>{user.subscription_type}</span>
                        <input 
                            placeholder='yyyy-mm-dd'
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
                        {user.last_activity ? <span>&nbsp;&nbsp;{date_to_yyyy_mm_dd(user.last_activity)}</span> : <span>&nbsp;&nbsp;Nežinoma</span>}
                    </div>
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

            <div className={styles.planasBox}>
                <div className={styles.planas}>
                    <span>Planas priskirtas</span>
                    <input 
                        className={!user.support_over ? styles[isTwoOrFourWeeks(user.assigned_plan)] : styles.colorSuccess}
                        type='date' 
                        name='assigned_plan' 
                        min='2024-01-01'                    
                        value={userData.assigned_plan} 
                        onChange={e => handleInputChange(e, user.id)}  
                    />
                </div>

                <div className={styles.prieziura}>
                    <span>Priežiūra baigta</span>
                    
                    <input 
                        className={`${styles['sc-gJwTLC']} ${check_box_styles.ikxBAC}`}
                        type='checkbox' 
                        name='support_over' 
                        value={userData.support_over} 
                        defaultChecked={userData.support_over} 
                        onChange={e => handleInputChange(e, user.id)}  
                    />
                </div>
            </div>
        </div>
    );
}

export default KlientaiRow;

export const KlientaiRowHeader = ({ setSearch, sort, setSort }) => {
    const [changeSort, setChangeSort] = useState('nutrition_tracking');


    const handleChange = (e) => {        
        setChangeSort(e.target.value)
    }

    return (    
        <div className={styles.headerRow}>
            <input 
                type='text' 
                placeholder='Paieška'
                // value={search}
                onChange={e => setSearch(e.target.value.toLocaleLowerCase())}
            />
            <select 
                name='sort' 
                value={changeSort}
                onChange={(e) => handleChange(e)}
            >
                <option value='name'>Vardas</option>
                <option value='email'>El. paštas</option>
                <option value='subscription_expires'>Narystė galioja</option>
                <option value='nutrition_tracking'>Mitybą seka iki</option>
                <option value='assigned_plan'>Planas priskirtas</option>
                <option value='support_over'>Priežiūros pabaiga</option>
            </select>
            <button onClick={() => setSort(prevState => ({...prevState, value: prevState.value === 'DESC'? 'ASC' : 'DESC'}))}>
                {sort.value === 'ASC' ? <IoIosArrowRoundDown className={styles.icon} /> : <IoIosArrowRoundUp className={styles.icon} />}
            </button>
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