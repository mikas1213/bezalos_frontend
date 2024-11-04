import styles from './UserDetails.module.css';

const UserDetails = ({ user }) => {
    return (
        <div className={styles.userDetails}>
            <div className={styles.row}>
                <span>Vardas: </span>
                <span>{user.name}</span>
            </div>

            <div className={styles.row}>
                <span>Mailas: </span>
                <span>{user.email}</span>
            </div>

            <div className={styles.row}>
                <span>Stripe vardas: </span>
                <span>{user.stripe_username}</span>
            </div>

            <div className={styles.row}>
                <span>Pirminis tikslas: </span>
                <span>{user.initial_target}</span>
            </div>

            <div className={styles.row}>
                <span>Narystė: </span>
                <span>{user.subscription_type}</span>
            </div>
        </div>
    );
};

export default UserDetails;