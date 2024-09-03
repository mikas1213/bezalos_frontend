import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import styles from './UserRow.module.css';
import check_box_styles from './CheckBox.module.css';
import { useState } from 'react';
import { FaRegCopy } from 'react-icons/fa';
import { date_to_yyyy_mm_dd, isTodayOrFiveDaysBefore, isTodayOrLater, isTwoOrFourWeeks, isMaintenance } from '../../../utils/helpers';
import stripe_img from '../../../assets/images/admin/stripe_png.png';
import UserBox, { SideBox} from './UserBox';

const UserRow = ({ user, 
    // users, setUsers, 
    onChangeUsers }) => {
    
    const axiosPrivate = useAxiosPrivate();
    const [week, setWeek] = useState(user.plan_assign_status === 'week' ? true : false );
    const [month, setMonth] = useState(user.plan_assign_status === 'month' ? true : false );
    
    const [userData, setUserDate] = useState({
        subscription_expires: date_to_yyyy_mm_dd(user.subscription_expires),
        plan_prepare: date_to_yyyy_mm_dd(user.plan_prepare),
        plan_prepare_status: user.plan_prepare_status,
        plan_assign: date_to_yyyy_mm_dd(user.plan_assign),
        plan_assign_status: user.plan_assign_status,
        maintenance: date_to_yyyy_mm_dd(user.maintenance),
        maintenance_status: user.maintenance_status
    });
    
    const onHandleChange = async (e, user_id, period) => {
        
        try {
            await axiosPrivate.patch(`/admin/user/${user_id}`, {
                column: e.target.name,
                value: e.target.name !== 'plan_assign_status' ? e.target.value : (e.target.checked ? period : 'none')
            });
            
            // const newUsers = [...users];
            // const newUser = newUsers.find(u => u.id === user_id);
            // const index = newUsers.findIndex(u => u.id === user_id);

            // newUser[e.target.name] = e.target.value;
            // if(e.target.name === 'subscription_expires') {
            //     if(!newUser.s_status) newUser.subscription_type = e.target.value ? 'Virtuvė' : 'free'
            // }
            
            // newUsers[index] = newUser;
            // setUsers(newUsers);

            // T-E-S-T-I-N-G
            let newUser = {user_id, [e.target.name]: e.target.value};

            // For manual setting subscription
            if(e.target.name === 'subscription_expires') {
                if(!user.s_status) newUser.subscription_type = e.target.value ? 'Virtuvė' : 'free'
            }
            onChangeUsers(newUser);
            
        } catch (err) {
            console.log(err.message)
        }
    };

    const handleInputChange = (e, user_id, period = null) => {
        
        if(e.target.name === 'plan_assign' && e.target.value === '') {
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

            <UserBox>
                <SideBox>
                    <div className={styles.userEmail} onClick={() => {navigator.clipboard.writeText(user.email)}}>
                        {user.email} <FaRegCopy className={styles.icon} />
                    </div>
                    <div className={styles.userName}>{user.name}</div>
                </SideBox>

                <SideBox>
                    <div className={styles.naryste}>
                        <div className={styles.inputGroup}>
                            <span className={styles[user.subscription_type]}>{user.subscription_type}</span>
                            <input 
                                placeholder='yyyy-mm-dd'
                                className={`${styles.inputDate} ${styles[isTodayOrFiveDaysBefore(user.subscription_expires)]}`}
                                type='date' 
                                min='2024-01-01'                    
                                name='subscription_expires'  
                                value={userData.subscription_expires}
                                onChange={e => handleInputChange(e, user.id)}  
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <img className={styles.stripeImg} src={stripe_img} alt='logo-img' />
                            <span className={styles[isTodayOrFiveDaysBefore(user.s_subscription_expires)]}>
                                {user.s_subscription_expires ? date_to_yyyy_mm_dd(user.s_subscription_expires) : 'Negalioja'}
                            </span>
                        </div>
                        
                    </div>
                    <div className={styles.lastActivity}>
                        Prisijungė:
                        {user.last_activity ? <span>&nbsp;&nbsp;{date_to_yyyy_mm_dd(user.last_activity)}</span> : <span>&nbsp;&nbsp;Nežinoma</span>}
                    </div>
                </SideBox>
            </UserBox>
        
            <UserBox>
                <SideBox>
                    <span className={styles.sideBoxTitle}>Mitybą seka iki</span>
                    <input 
                        className={`${styles.inputDate} ${styles[isTodayOrLater(user.plan_prepare)]}`}
                        type='date' 
                        min='2024-01-01'
                        name='plan_prepare' 
                        value={userData.plan_prepare} 
                        onChange={e => handleInputChange(e, user.id)}  
                    />
                </SideBox>
                
                <SideBox>
                    <span className={styles.sideBoxTitle}>Statusas</span>
                    <select 
                        className={`${styles.statusSelect} ${user.plan_prepare_status === 'Tinka' ? styles.colorDanger : styles.colorLight}`}
                        name='plan_prepare_status' 
                        value={userData.plan_prepare_status} 
                        onChange={e => handleInputChange(e, user.id)}
                    >
                        <option>Pasirinkti</option>
                        <option>Paklausta</option>
                        <option>Nusiųsta</option>
                        <option>Tinka</option>
                        <option>Trūksta anketos</option>
                    </select>
                </SideBox>
            </UserBox>

            <UserBox>
                <SideBox>
                    <span className={styles.sideBoxTitle}>Planas priskirtas</span>
                    <input 
                        className={`${styles.inputDate} ${month ? styles.colorSuccess : styles[isTwoOrFourWeeks(user.plan_assign)]}`}
                        type='date' 
                        name='plan_assign' 
                        min='2024-01-01'                    
                        value={userData.plan_assign}  
                        onChange={e => handleInputChange(e, user.id)}  
                    />
                </SideBox>

                <SideBox>
                    {(!week && !month) && <span className={styles.sideBoxTitle}>Statusas</span>}
                    {week && <span className={styles.sideBoxTitle}>2 savaitės</span>}
                    {month && <span className={styles.sideBoxTitle}>1 mėnesis</span>}

                    <div className={styles.checkBoxes}>
                        <input 
                            className={`${check_box_styles.ikxBAC} ${week ? check_box_styles.week : ''}`}
                            type='checkbox' 
                            name='plan_assign_status' 
                            value='week' 
                            checked={week}
                            onChange={e => handleInputChange(e, user.id, 'week')}  
                        />

                        <input 
                            className={`${check_box_styles.ikxBAC} ${month ? check_box_styles.month : ''}`}
                            type='checkbox' 
                            name='plan_assign_status' 
                            value='month' 
                            checked={month}
                            onChange={e => handleInputChange(e, user.id, 'month')}  
                        />
                    </div>
                </SideBox>
            </UserBox>

            <UserBox>
                <SideBox>
                    <span className={styles.sideBoxTitle}>Priežiūra</span>
                    <input 
                        className={`${styles.inputDate} ${styles[isMaintenance(user.maintenance, user.maintenance_status).setClass]}`}
                        type='date' 
                        name='maintenance' 
                        min='2024-01-01'                    
                        value={userData.maintenance}  
                        onChange={e => handleInputChange(e, user.id)}  
                    />
                </SideBox>
                <SideBox>
                    <span className={styles.sideBoxTitle}>Statusas</span>
                    <select 
                        className={`${styles.statusSelect} ${styles.colorLight}`}
                        name='maintenance_status' 
                        value={userData.maintenance_status} 
                        onChange={e => handleInputChange(e, user.id)}
                    >
                        <option>Pasirinkti</option>
                        <option disabled={isMaintenance(user.maintenance, user.maintenance_status).sav !== '1_sav'}>1 sav</option>
                        <option disabled={isMaintenance(user.maintenance, user.maintenance_status).sav !== '2_sav'}>2 sav</option>
                        <option disabled={isMaintenance(user.maintenance, user.maintenance_status).sav !== '3_sav'}>3 sav</option>
                        <option disabled={isMaintenance(user.maintenance, user.maintenance_status).sav !== '4_sav'}>4 sav</option>
                    </select>
                </SideBox>
            </UserBox>
        </div>
    );
}

export default UserRow;
