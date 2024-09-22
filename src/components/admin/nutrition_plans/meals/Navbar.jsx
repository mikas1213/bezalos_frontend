import styles from './Navbar.module.css';
// import { useState } from 'react';
import { LiaPizzaSliceSolid } from 'react-icons/lia';
import Checkbox from './Checkbox';
import CheckboxCustom from './CheckboxCustom';

const Navbar = ({ handleMealAdd }) => {
    // const [checkBoxVal, setCheckBoxVal] = useState(false);

    return (
        <div className={styles.navbar}>
            <div className={styles.newMeal} onClick={handleMealAdd}>
                <div className={styles.newMealBtn}>
                    <LiaPizzaSliceSolid className={styles.icon} />
                    <span> Naujas valgis</span>
                </div>
            </div>

            <div className={styles.divider}></div>
            <div className={styles.filterLogic}>
                <CheckboxCustom id='A+B' label='A+B' />
                <CheckboxCustom id='B+R' label='B+R' />
                <CheckboxCustom id='A+R' label='A+R' />
            </div>
            <div className={styles.divider}></div>
            <div className={styles.filterIntolerance}>
                <Checkbox id='glute' label='be glitimo' value={true} />
                <Checkbox id='lactose' label='be laktozės' value={false} />
            </div>

            <div className={styles.searchMeal}>
                <input type="text" placeholder='ieškoti...'/>
            </div>
        </div>
    );
};

export default Navbar;