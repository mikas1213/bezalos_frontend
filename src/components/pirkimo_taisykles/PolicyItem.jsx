import styles from './PolicyItem.module.css';

const PolicyItem = ({ policy, reasons = ''}) => {
    return (
        <>
            <div className={styles.policy}>
                <span>•</span>
                <p>{policy}</p>
            </div>

            {policy.indexOf('Jei užsakymas jau buvo pradėtas') > -1 && <div className={styles.reasons}>
                {reasons && reasons.map((reason, index) => <div key={index} className={styles.reason}>
                    <span>–</span>
                    <span className={styles.text}>{reason}</span>
                </div>)}
            </div>}
        </>
    );
};

export default PolicyItem;