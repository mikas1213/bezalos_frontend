import styles from './BendraInfo.module.css';
import { User, Ruler, Weight, Activity, Target, Calendar, Hospital, Baby } from 'lucide-react';

const BendraInfo = ({ anketa }) => {
    console.log('anketa', anketa)
    return (
        <div className={styles.bendraInfo}>
            <h1>Bendra Informacija</h1>
            <div className={styles.infoRows}>
                <InfoRow icon={<User className={styles.icon}/>} label='Lytis' value={anketa.gender} />
                <InfoRow icon={<User className={styles.icon}/>} label='Amžius' value={anketa.age} />
                <InfoRow icon={<Ruler className={styles.icon}/>} label='Ūgis' value={anketa.height} />
                <InfoRow icon={<Weight className={styles.icon}/>} label='Svoris' value={anketa.weight} />
                <InfoRow icon={<Activity className={styles.icon}/>} label='Aktyvumas' value={anketa.activity_steps} />
                <InfoRow icon={<Target className={styles.icon}/>} label='Tikslas' value={anketa.goal} />
                <InfoRow icon={<Calendar className={styles.icon}/>} label='Darbo grafikas' value={anketa.schedule} />
                {anketa.feeding && <InfoRow icon={<Baby className={styles.icon}/>} label='Maitinu' value={anketa.feeding_desc} />}
                {anketa.health_problems && <InfoRow icon={<Hospital className={styles.icon}/>} label='Sveikata' value={anketa.health_problems_desc} />}
            </div>
            
        </div>
    );
};

const InfoRow = ({ icon, label, value }) => {
    return (
        <div className={styles.infoRow}>
            <div className={styles.iconContainer}>{icon}</div>
            <div className={styles.rowData}>
                <div className={styles.label}>{label}</div>
                <div className={styles.value}>{value}</div>
            </div>
        </div>
    );
};

export default BendraInfo;