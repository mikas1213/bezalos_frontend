import styles from './BendraInfo.module.css';

import { User, Ruler, Weight, Activity, PersonStanding, Target, Calendar, Hospital, Baby } from 'lucide-react';
import { kmi } from '../../../../utils/calculationsHelpers';

const BendraInfo = ({ anketa }) => {
    
    return (
        <div className={styles.bendraInfo}>
            <h1>Bendra Informacija</h1>

            <div className={styles.rowsSection_1}>
                <InfoRow icon={<User />} label='Lytis' value={anketa?.gender} />
                <InfoRow icon={<Ruler />} label='Ūgis' value={anketa?.height} />
                <InfoRow icon={<User />} label='Amžius' value={anketa?.age} />
                <InfoRow icon={<Weight />} label='Svoris' value={anketa?.weight} />
                <InfoRow icon={<Activity />} label='Aktyvumas' value={anketa?.activity_steps} />
                <InfoRow icon={<PersonStanding />} label='KMI' value={kmi(anketa?.weight, anketa?.height)} />
            </div>     

            <div className={styles.rowsSection_2}>
                <InfoRow icon={<Target />} label='Tikslas' value={anketa?.goal} />
                <InfoRow icon={<Calendar />} label='Darbo grafikas' value={anketa?.schedule} />
                {anketa?.feeding && <InfoRow icon={<Baby />} label='Maitinu' value={anketa?.feeding_desc} />}
                {anketa?.health_problems && <InfoRow icon={<Hospital />} label='Sveikata' value={anketa?.health_problems_desc} />}
            </div>
        </div>
    );
};

const InfoRow = ({ icon, label, value = '-'}) => {

    const color = label === 'KMI' ? (value > 18.49 && value < 22.5) ? 'good' : 'bad' : '';
    return (
        <div className={`${styles.infoRow} ${['Maitinu', 'Sveikata'].includes(label) ? styles.prop : ''}`}>
            <div className={styles.iconContainer}>{icon}</div>
            <div className={styles.infoData}>
                <h3 >{label}</h3>
                <h2 className={`${styles[color]}`}>{value}</h2>
            </div>
        </div>
    );
};

export default BendraInfo;