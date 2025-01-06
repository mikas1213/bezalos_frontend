import styles from './UserDetails.module.css';

const UserDetails = ({ userDetails }) => {
    
    return (
        <div className={styles.userDetails}>
            <div className={styles.userItem}>
                <span className={styles.label}>{userDetails.stripe_username || userDetails.name}</span>
                <span className={styles.value}>{userDetails.email}</span>    
            </div>
        
            <div className={styles.userItem}>
                <span className={styles.label}>Tikslas</span>
                <span className={styles.value}>{userDetails.initial_target}</span>    
            </div>
        
                        
            {userDetails.anketa.length > 0 ? <>
                <div className={styles.userItem}>
                    <span className={styles.label}>Aktyvumas</span>
                    <span className={styles.value}>{userDetails.anketa[0]?.activity_steps}</span>    
                </div>
                            
                <div className={styles.userItem}>
                    <span className={styles.label}>Sveikatos problemos</span>
                    <span className={styles.value}>
                        {userDetails.anketa[0].health_problems ? userDetails.anketa[0].health_problems_desc : 'Nėra'}
                    </span>    
                </div>
        
                <div className={styles.userItem}>
                    <span className={styles.label}>Nevalgomi produktai</span>
                    <span className={styles.value}>
                        {userDetails.anketa[0].intolerance ? userDetails.anketa[0].intolerance_desc : 'Nėra'}
                    </span>    
                </div>
            </> : <span className={styles.label}>Anketa dar neužpildyta</span>}
        </div>
    );
};

export default UserDetails;