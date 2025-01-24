import styles from './UserRow.module.css';
import check_box_styles from './CheckBox.module.css';
import { useState } from 'react';
import { FaRegCopy } from 'react-icons/fa';
import { HiTemplate } from 'react-icons/hi';
import { date_with_time, date_to_yyyy_mm_dd, isTodayOrFiveDaysBefore, isTodayOrLater, isTwoOrFourWeeks, isMaintenance } from '../../../utils/dateHelpers';
import stripe_img from '../../../assets/images/admin/stripe_png.png';
import UserBox, { SideBox } from './UserBox';
import { useNavigate } from 'react-router-dom';

const UserRow = ({ user, handleSubscriptionUpdate, handleUserUpdate }) => {
    const navigate = useNavigate();
    const [calories, setCalories] = useState(user.eats_calories || '');
    const handle_VIRTUVE_CANCELED = () => { handleUserUpdate(user.id, 'subscription_type', 'Canceled_virtuve'); }
    
    return (    
        <div className={styles.userRow}>

            <UserBox>
                <SideBox>
                    <div className={styles.userEmail} >
                        <span onClick={() => navigate(`/admin/${user.id}`)}>{user.email} </span>
                        <FaRegCopy className={styles.icon} onClick={() => {navigator.clipboard.writeText(user.email)}} />
                    </div>
                    <div className={styles.userName}>
                        {user.stripe_username || user.name}
                        {user.has_order && <HiTemplate 
                            className={`${styles.plan_icon} ${user.orders[0]?.title === 'Mitybos planas + 4 savaičių priežiūra' ? styles.icon_blue : ''}`} 
                        />}
                    </div>
                    
                </SideBox>

                <SideBox>
                    <div className={styles.naryste}>
                        <div className={styles.inputGroup}>
                            <span 
                                onClick={user.subscription_type === 'UNPAID' ? handle_VIRTUVE_CANCELED : undefined}
                                className={styles[user.subscription_type]}
                            >{user.subscription_type}</span>
                            <input 
                                placeholder='yyyy-mm-dd'
                                className={`${styles.inputDate} ${styles[isTodayOrFiveDaysBefore(user.subscription_expires)]}`}
                                type='date' 
                                min='2024-01-01'                    
                                name='subscription_expires'   
                                value={user.subscription_expires || ''}
                                onChange={(e) => handleSubscriptionUpdate(user.id, e.target.value, user.s_status)}
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
                        {user.last_activity ? <span>&nbsp;&nbsp;{date_with_time(user.last_activity)}</span> : <span>&nbsp;&nbsp;Nežinoma</span>}
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
                        value={user.plan_prepare || ''} 
                        onChange={e => handleUserUpdate(user.id, e.target.name, e.target.value)}
                    />
                </SideBox>
                
                <SideBox>
                    <span className={styles.sideBoxTitle}>Statusas</span>
                    <select 
                        className={`${styles.statusSelect} ${user.plan_prepare_status === 'Tinka' ? styles.colorDanger : styles.colorLight}`}
                        name='plan_prepare_status' 
                        value={user.plan_prepare_status} 
                        onChange={e=> handleUserUpdate(user.id, e.target.name, e.target.value)}
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
                        className={`${styles.inputDate} ${user.plan_assign_status === 'month' ? styles.colorSuccess : styles[isTwoOrFourWeeks(user.plan_assign)]}`}
                        type='date' 
                        name='plan_assign' 
                        min='2024-01-01'                     
                        value={user.plan_assign || ''}
                        onChange={e => handleUserUpdate(user.id, e.target.name, e.target.value)}
                    />
                </SideBox>

                <SideBox>
                    <span className={styles.sideBoxTitle}>
                        {user.plan_assign_status === 'week' ? '2 savaitės' : user.plan_assign_status === 'month' ? '1 mėnesis' : 'Statusas'}
                    </span>
                    <div className={styles.checkBoxes}>
                        <input 
                            className={`${check_box_styles.ikxBAC} ${user.plan_assign_status === 'week' ? check_box_styles.week : ''}`}
                            type='checkbox' 
                            name='plan_assign_status' 
                            value='week' 
                            checked={user.plan_assign_status === 'week'}
                            onChange={e => handleUserUpdate(user.id, e.target.name, e.target.checked ? e.target.value : 'none')}
                        />

                        <input 
                            className={`${check_box_styles.ikxBAC} ${user.plan_assign_status === 'month' ? check_box_styles.month : ''}`}
                            type='checkbox' 
                            name='plan_assign_status' 
                            value='month' 
                            checked={user.plan_assign_status === 'month'}
                            onChange={e => handleUserUpdate(user.id, e.target.name, e.target.checked ? e.target.value : 'none')}
                        />
                    </div>
                </SideBox>
            </UserBox>

            <UserBox>
                <SideBox>
                    <span className={styles.sideBoxTitle}>Valgė per mažai</span>
                    <input 
                        type='checkbox' 
                        name='eats_status' 
                        className={`${check_box_styles.ikxBAC} ${user.eats_status ? check_box_styles.eat : ''}`}
                        value={true} 
                        checked={user.eats_status}
                        onChange={e => handleUserUpdate(user.id, e.target.name, e.target.checked ? true : false)}
                    />
                </SideBox>

                <SideBox>
                    <span className={styles.sideBoxTitle}>Kalorijos</span>
                    <input 
                        type='text' 
                        name='eats_calories'
                        className={styles.eats_calories}
                        value={calories}
                        onBlur={e => handleUserUpdate(user.id, e.target.name, e.target.value)}  
                        onChange={e => setCalories(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && e.target.blur()}
                    />
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
                        value={user.maintenance || ''}
                        onChange={e => handleUserUpdate(user.id, e.target.name, e.target.value)}
                    />
                </SideBox>
                <SideBox>
                    <span className={styles.sideBoxTitle}>Statusas</span>
                    <select 
                        className={`${styles.statusSelect} ${styles.colorLight}`}
                        name='maintenance_status' 
                        value={user.maintenance_status} 
                        onChange={e => handleUserUpdate(user.id, e.target.name, e.target.value)}
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
