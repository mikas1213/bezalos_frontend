import Circle from './Circle';
import Meal from './Meal';
import SelectPlan from './SelectPlan';

import styles from './No_Plans.module.css';

const No_Plans = () => {
    return (
        <div className={styles.plans}>
            <div className={styles.overlay}></div>
            <div className={styles.planHeader}>

                <SelectPlan />
                <Circle />

                <div className={styles.meals}>
                    <Meal title='Pusryčiai' />
                    <Meal title='Užkandis' />
                    <Meal title='Pietūs' />
                    <Meal title='Vakarienė' />
                </div>
            </div>
        </div>
    );
};

export default No_Plans;