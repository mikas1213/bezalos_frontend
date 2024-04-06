import styles from './WelcomeSection.module.css';

import Burger from '../../assets/images/homepage/meal-burger.webp';
import Sandwich from '../../assets/images/homepage/meal-sandwich.webp';
import Salad from '../../assets/images/homepage/meal-salad.webp';
import Vegetables from '../../assets/images/homepage/meal-vegetables.webp';
import Pancakes from '../../assets/images/homepage/meal-pancakes.webp';

import { useState, useEffect } from 'react';
// const images = [Burger, Pancakes, Sandwich, Salat, Vegetables];
const images = [Burger, Sandwich, Salad, Vegetables, Pancakes];
const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const WelcomeSection = () => {
    const [isAnimate, setIsAnimate] = useState();
    const randomPhoto = randomIntFromInterval(0, 4);
    const [image, setImage] = useState();
    

    useEffect(() => {
        setImage(images[randomPhoto]);
        setIsAnimate(true);
        return () => setIsAnimate(false);
    }, []);

    return (
        <section className={styles.welcomeSection}>
            <div className={styles.welcomeContainer}>
                <div
                    className={`${styles.welcomeLeft} ${
                        isAnimate ? styles.onload : ''
                    }`}
                >
                    <div className={styles.welcomeMsg}>
                        <p>Tavo <span>ilgalaikių</span> mitybos pokyčių garantas</p>
                    </div>

                    <div className={styles.welcomeTxt}>
                        <p>Čia išmoksi sveikatai palankios mitybos pagrindų, tapsi bendruomenės nare. Juk drauge įpročius formuoti lengviau!</p>
                    </div>

                    <div>
                        <button className={styles.btn}>Virtuvė</button>
                    </div>
                </div>

                <div className={styles.welcomeRight}>
                    <img
                        className={isAnimate ? styles.onload : ''}
                        src={image}
                        alt='Burger'
                    />
                </div>
            </div>
        </section>
    );
};

export default WelcomeSection;
