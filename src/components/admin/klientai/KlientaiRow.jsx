import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import styles from './KlientaiRow.module.css';
import { useState } from 'react';
import { date_to_yyyy_mm_dd, isTodayOrFiveDaysBefore, isTodayOrLater, isTwoOrFourWeeks } from '../../../utils/helpers';
import check_box_styles from './CheckBox.module.css';
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from 'react-icons/io';
import { IoCloseCircle } from 'react-icons/io5';

const KlientaiRow = ({ user, users, setUsers }) => {
    
    const axiosPrivate = useAxiosPrivate();
    const [week, setWeek] = useState(user.support_over === 'week' ? true : false );
    const [month, setMonth] = useState(user.support_over === 'month' ? true : false );
    
    const [userData, setUserDate] = useState({
        subscription_expires: date_to_yyyy_mm_dd(user.subscription_expires),
        nutrition_tracking: date_to_yyyy_mm_dd(user.nutrition_tracking),
        nutrition_plan_status: user.nutrition_plan_status,
        assigned_plan: date_to_yyyy_mm_dd(user.assigned_plan),
        support_over: user.support_over,
    });

    const onHandleChange = async (e, user_id, period) => {
        
        try {
            await axiosPrivate.patch(`/admin/user/${user_id}`, {
                column: e.target.name,
                value: e.target.name !== 'support_over' ? e.target.value : (e.target.checked ? period : 'none')
            });
            
            const newUsers = [...users];
            const newUser = newUsers.find(u => u.id === user_id);
            const index = newUsers.findIndex(u => u.id === user_id);

            // newUser[e.target.name] = e.target.name !== 'support_over' ? e.target.value : (e.target.checked ? e.target.value : 'none');
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

    const handleInputChange = (e, user_id, period = null) => {
        
        if(e.target.name === 'assigned_plan' && e.target.value === '') {
            console.log(e.target.name, e.target.value);
            setWeek(false);
            setMonth(false);
        }
        if(period === 'week') {
            setWeek(w => !w);
            setMonth(false);
        }
        if(period === 'month') {
            setMonth(m => !m);
            setWeek(false);
        }
        
        setUserDate({ ...userData, [e.target.name]: e.target.value });
        onHandleChange(e, user_id, period);
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
                        className={month ? styles.colorSuccess : styles[isTwoOrFourWeeks(user.assigned_plan)]}
                        type='date' 
                        name='assigned_plan' 
                        min='2024-01-01'                    
                        value={userData.assigned_plan}  
                        onChange={e => handleInputChange(e, user.id)}  
                    />
                </div>

                <div className={styles.prieziura}>
                    {(!week && !month) && <span>Statusas</span>}
                    {week && <span>2 savaitės</span>}
                    {month && <span>1 mėnesis</span>}

                    <div className={styles.checkBoxes}>
                        <input 
                            className={`${check_box_styles.ikxBAC} ${week ? check_box_styles.week : ''}`}
                            type='checkbox' 
                            name='support_over' 
                            value='week' 
                            checked={week}
                            onChange={e => handleInputChange(e, user.id, 'week')}  
                        />

                        <input 
                            className={`${check_box_styles.ikxBAC} ${month ? check_box_styles.month : ''}`}
                            type='checkbox' 
                            name='support_over' 
                            value='month' 
                            checked={month}
                            onChange={e => handleInputChange(e, user.id, 'month')}  
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default KlientaiRow;

export const KlientaiRowHeader = ({ setSearch, search, sort, setSort }) => {
    const [changeSort, setChangeSort] = useState('subscription_expires');


    const handleChange = (e) => {        
        setChangeSort(e.target.value);
        setSort(prevSort => ({
            ...prevSort, column: e.target.value
        }));
    }

    return (    
        <div className={styles.headerRow}>
            <div className={styles.paieskaContainer}>
                <input 
                    type='text' 
                    placeholder='Paieška'
                    value={search}
                    onChange={e => setSearch(e.target.value.toLocaleLowerCase())}
                />
                <IoCloseCircle className={styles.icon} onClick={() => setSearch('')} />
            </div>
            <select 
                name='sort' 
                value={changeSort}
                onChange={(e) => handleChange(e)}
            >
                <option value='name'>Vardas</option>
                <option value='email'>El. paštas</option>
                <option value='subscription_expires'>Narystė galioja</option>
                <option value='last_activity'>Prisijungta</option>
                <option value='nutrition_tracking'>Mitybą seka iki</option>
                <option value='assigned_plan'>Planas priskirtas</option>
                {/* <option value='support_over'>Priežiūros pabaiga</option> */}
                <option value='subscription_type'>free</option>
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