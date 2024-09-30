import styles from './Filters.module.css';
import { ImPlus } from "react-icons/im";

const Filters = () => {
    return (
        <>
            <div className={styles.newPlanBtn}>
                <ImPlus className={styles.icon} />
                <span>Naujas planas</span>
            </div>

        </>
    )
};

export default Filters;