import styles from './UserDetails.module.css';
import SearchInput from '../SearchInput';

const UserDetails = ({ setSearchUser }) => {
    
    return (
        <div className={styles.userDetais}>
            <SearchInput onChangeValue={setSearchUser} />
        </div>
    );
};

export default UserDetails;