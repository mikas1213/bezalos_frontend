import styles from './BendraInfo.module.css';

import { User, Ruler, Weight, Activity, PersonStanding, Target, Calendar, Hospital, Baby, Info } from 'lucide-react';
import { FaRegCopy } from 'react-icons/fa';
import { kmi } from '../../../../utils/calculationsHelpers';

const BendraInfo = ({ user, anketa }) => {
    return (
        <div className={styles.bendraInfo}>

            <div>
                <h1>Bendra Informacija</h1>
                <span className={styles.userName}>{user.stripe_username || user.user_name} </span>
                <span className={styles.userEmail}>
                    |&nbsp;{user.user_email}
                    <FaRegCopy 
                        className={styles.copyIcon} 
                        onClick={() => navigator.clipboard.writeText(user.user_email)}
                    />
                </span>
            </div>
            
            <div className={styles.rowsSection_1}>
                <InfoRow icon={<User />} label='Lytis' value={anketa?.gender} />
                <InfoRow icon={<Ruler />} label='Ūgis' value={anketa?.height} />
                <InfoRow icon={<User />} label='Amžius' value={anketa?.age} />
                <InfoRow icon={<Weight />} label='Svoris' value={anketa?.weight} />
                <InfoRow icon={<Activity />} label='Aktyvumas' value={anketa?.activity_steps} />
                <InfoRow icon={<PersonStanding />} label='KMI' value={kmi(anketa?.weight, anketa?.height) || '-'} />
            </div>     

            <div className={styles.rowsSection_2}>
                <InfoRow icon={<Target />} label='Tikslas' value={anketa?.goal} />
                <InfoRow icon={<Calendar />} label='Darbo grafikas' value={anketa?.schedule} />
                {anketa?.feeding && <InfoRow icon={<Baby />} label='Maitinu' value={anketa?.feeding_desc} />}
                {anketa?.health_problems && <InfoRow icon={<Hospital />} label='Sveikata' value={anketa?.health_problems_desc} />}
            </div>

            <div className={styles.rowsSection_3}>
                <div className={`${styles.infoRow} ${styles.prop}`}>
                    <div className={styles.iconContainer}><Info /></div>
                    <div className={styles.infoData}>
                        <h2>Papildoma informacija</h2>
                        <h3>{anketa?.additional_info}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

const InfoRow = ({ icon, label, value = '-'}) => {
    
    const color = label === 'KMI' ? (value > 18.49 && value < 25) ? 'good' : value !== '-' ? 'bad' : '' : '';
    return (
        <div className={`${styles.infoRow} ${['Maitinu', 'Sveikata', 'Papildoma informacija'].includes(label) ? styles.prop : ''}`}>
            <div className={styles.iconContainer}>{icon}</div>
            <div className={styles.infoData}>
                <h3 >{label}</h3>
                <h2 className={`${styles[color]}`}>{value}</h2>
            </div>
        </div>
    );
};

export default BendraInfo;