import styles from './Features.module.css';
import MonthYearTab from './MonthYearTab';
import { FaRegCircleXmark, FaCircleCheck } from "react-icons/fa6";
import usePayment from '../../../../hooks/usePayment';
const Features = () => {
    const { variant } = usePayment();
    
    return (
        <div className={styles.features}>
            <div className={styles.monthYearTab}>
                <MonthYearTab />
            </div>
            

            <div className={styles.feature}>
                <div>Kažkas PLUS dar</div>
                <div><FaCircleCheck /></div>
            </div>



            <div className={styles.feature}>
                <div>Rezultatų sekimas</div>
                <div><FaCircleCheck /></div>
            </div>
            <div className={styles.feature}>
                <div>Produktų keitimas</div>
                <div><FaCircleCheck /></div>
            </div>
            <div className={styles.feature}>
                <div>Receptų kūrimas</div>
                <div><FaCircleCheck /></div>
            </div>
            <div className={styles.feature}>
                <div>Video mokymai ir dirbtuvės</div>
                <div>
                    {variant === 'virtuve' &&  <FaCircleCheck />}
                    {variant === 'profilis' &&  <FaRegCircleXmark />}
                </div>
            </div>
            <div className={styles.feature}>
                <div>Merginų bendruomenė</div>
                <div>
                    {variant === 'virtuve' &&  <FaCircleCheck />}
                    {variant === 'profilis' &&  <FaRegCircleXmark />}
                </div>
            </div>
            <div className={styles.feature}>
                <div>Online ir gyvi susitikimai</div>
                <div>
                    {variant === 'virtuve' && <FaCircleCheck />}
                    {variant === 'profilis' && <FaRegCircleXmark />}
                </div>
            </div>
        </div>
    );
};

export default Features;