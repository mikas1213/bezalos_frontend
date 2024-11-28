import styles from './DabartiniaiIprociai.module.css';

const DabartiniaiIprociai = ({ anketa }) => {
    return (
        <div className={styles.dabartiniaiIprociai}>
            <h1>Dabartiniai įpročiai</h1>

            <div className={styles.additionalInfo}>
                <div className={styles.info}>
                    <h2>Dietos</h2>
                    <p className={styles.infoDesc}>{anketa?.diet_desc}</p>
                </div>

                <div className={styles.info}>
                    <h2 className={styles.infoHeader}>Netoleruojami maisto produktai</h2>
                    <p className={styles.infoDesc}>{anketa?.intolerance_desc}</p>
                </div>
            </div>

            <div className={styles.routines}>
                <Routine label='Pusryčiai' time={anketa?.breakfast_time} desc={anketa?.breakfast_desc} />
                <Routine label='Pietūs' time={anketa?.lunch_time} desc={anketa?.lunch_desc} />
                <Routine label='Užkandis' time={anketa?.snack_time} desc={anketa?.snack_desc} />
                <Routine label='Vakarienė' time={anketa?.dinner_time} desc={anketa?.dinner_desc} />
            </div>
        </div>
    );
};

const Routine = ({ label, time = '', desc = '-' }) => {
    
    return (
        <div className={styles.routine}>
            <div className={styles.routineHeader}>
                {time !== '--:--' && <h2 className={styles.time}>{time}</h2>}
                <h2 className={styles.label}>{label}</h2>
            </div>
            <div className={styles.routineInfo}>
                <p className={styles.desc}>{desc}</p>
            </div>
        </div>
    );
};

export default DabartiniaiIprociai;