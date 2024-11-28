import styles from './NaujiIprociai.module.css';

const NaujiIprociai = ({ anketa }) => {
    return (
        <div className={styles.naujiIprociai}>
            <h1>Nauji įpročiai</h1>
            <div className={styles.routines}>
                <Days dayLabel='Darbo diena' days={anketa.routines.workday} />
                <Days dayLabel='Laisvadienis' days={anketa.routines.day_off} />
            </div>
        </div>
    );
};

const gali = [
    {key: 'get_up', label: 'Keliuosi'}, 
    {key: 'go_sleep', label: 'Einu miegoti'}, 
    {key: 'sport', label: 'Sportas'}
];
const negali = [
    {key: 'breakfast_time', label: 'Pusryčiai'}, 
    {key: 'lunch_time', label: 'Pietūs'}, 
    {key: 'snack_time', label: 'Užkandis'}, 
    {key: 'dinner_time', label: 'Vakarienė'}
]
const gali_negali = {
    'Galiu valgyti betkada': gali,
    'Negaliu valgyti betkada': [...gali, ...negali]
};

const Days = ({ dayLabel, days }) => {
    return (
        <div className={styles.days}>
            {days.map(day => <div key={day.day_id} className={styles.day}>
                <div className={styles.dayHeader}>
                    <div className={styles.dayLabel}>{dayLabel}</div>
                    <div className={styles.eat}>{day.eat}</div>
                </div>
                <div className={styles.items}>
                    {gali_negali[day.eat].map(item => 
                        <div key={item.key} className={styles.item}>
                            <span className={styles.label}>{item.label}</span>
                            <span className={styles.time}>{day[item.key]}</span>
                        </div>
                    )}
                </div>
            </div>)}
        </div>
    );
};

export default NaujiIprociai;

