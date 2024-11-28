import styles from './DabartiniaiIprociai.module.css';

const DabartiniaiIprociai = ({ anketa }) => {
    return (
        <div className={styles.dabartiniaiIprociai}>
            <h1>Dabartiniai įpročiai</h1>

            <div className={styles.routines}>

                <Routine label='Pusryčiai' time={anketa.breakfast_time} desc={anketa.breakfast_desc} />
                <Routine label='Pietūs' time={anketa.lunch_time} desc={anketa.lunch_desc} />
                <Routine label='Užkandis' time={anketa.snack_time} desc={anketa.snack_desc} />
                <Routine label='Vakarienė' time={anketa.dinner_time} desc={anketa.dinner_desc} />

                <Routine label='Dietos' desc={anketa.dinner_desc} />
                <Routine label='Netoleruojami maisto produktai' desc={anketa.dinner_desc} />
            </div>
        </div>
    );
};

const Routine = ({ label, time, desc }) => {
    console.log(time)
    return (
        <div className={styles.routine}>
            {time && <span className={styles.time}>{time}</span>}
            <div className={styles.info}>
                <span className={styles.label}>{label}</span>
                <span className={styles.desc}>{desc}</span>
            </div>
        </div>
    );
};

export default DabartiniaiIprociai;