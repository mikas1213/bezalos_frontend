import { IoIosArrowBack } from 'react-icons/io';

import styles from './SelectPlan.module.css';

const SelectPlan = () => {


    return (
        <>
        <div 
            className={styles.planTitle} 
            onMouseDown={(e) => e.stopPropagation()}
        >
            <div>
                <span>Neturite mitybos plano</span>
                <span>Planą įsigyti gali paslaugų skiltyje</span>
            </div>
            <IoIosArrowBack className={styles.icon} />
        </div>
        </>
    );
};

export default SelectPlan;