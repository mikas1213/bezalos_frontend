import styles from './PolicyItem.module.css';

const PolicyItem = ({ policy, reasons = ''}) => {
    // console.log(reasons)
    return (
        <>
            <div className={styles.policyItem}>
                <div className={styles.polices}>
                    <span>•</span>
                    <p>{policy}</p>
                </div>

                {policy.indexOf('Jei užsakymas jau buvo pradėtas') > -1 && <div className={styles.reasons}>
                    {reasons && reasons?.map((r, i) => <p key={i} className={styles.reason}>-&nbsp;&nbsp;{r}</p>)}
                </div>}
                
                
            </div>
            
        </>
    );
};

export default PolicyItem;