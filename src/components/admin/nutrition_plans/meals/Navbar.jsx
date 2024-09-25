import styles from './Navbar.module.css';
import { LiaPizzaSliceSolid } from 'react-icons/lia';
import CheckboxIntolerance from './CheckboxIntolerance';
import CheckboxLogic from './CheckboxLogic';
import { useState } from 'react';

const Navbar = ({ handleMealAdd, setFilters }) => {
    const [clickedLogic, setClickedLogic] = useState('');

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
                <CheckboxLogic id='A+B' label='A+B' name='logic' clickedLogic={clickedLogic} setClickedLogic={setClickedLogic} setFilters={setFilters} />
                <CheckboxLogic id='B+R' label='B+R' name='logic' clickedLogic={clickedLogic} setClickedLogic={setClickedLogic} setFilters={setFilters} />
                <CheckboxLogic id='A+R' label='A+R' name='logic' clickedLogic={clickedLogic} setClickedLogic={setClickedLogic} setFilters={setFilters} />
            </div>
            <div className={styles.divider}></div>
            <div className={styles.filterIntolerance}>
                <CheckboxIntolerance id='glute' label='be glitimo' name='is_gluten' onSetFilter={setFilters} />
                <CheckboxIntolerance id='lactose' label='be laktozės' name='is_lactose' onSetFilter={setFilters} />
            </div>

            <div className={styles.searchMeal}>
                <input type='text' name='search' placeholder='ieškoti...' onChange={e => setFilters(prevState => ({ ...prevState, [e.target.name]: e.target.value}))}/>
            </div>
        </div>
    );
};

export default Navbar;