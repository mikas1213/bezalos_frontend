import styles from './WelcomeSection.module.css';
import Section from './ui/Section';
import MainContainer from './ui/MainContainer';
import { useNavigate } from "react-router-dom";

// import Burger from '../../assets/images/homepage/meal-burger.webp';
import Burger from '../../assets/images/homepage/meal-burgeriukas.png';
import Sandwich from '../../assets/images/homepage/meal-sandwich.webp';
import Salad from '../../assets/images/homepage/meal-salad.webp';
import Vegetables from '../../assets/images/homepage/meal-vegetables.webp';
import Pancakes from '../../assets/images/homepage/meal-pancakes.webp';

import { useState, useEffect } from 'react';

const images = [Burger, Sandwich, Salad, Vegetables, Pancakes];
const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const rndNum = randomIntFromInterval(0, 4);

const WelcomeSection = () => {
    const navigate = useNavigate();
    const [isAnimate, setIsAnimate] = useState();
    
    useEffect(() => {
        setIsAnimate(true);
        return () => setIsAnimate(false);
    }, []);

    return (
        <Section customClass={styles.welcomeSection}>
            <MainContainer customClass={styles.welcomeContainer}>
                <div className={`${styles.welcomeLeft} ${ isAnimate ? styles.onload : '' }`}>
                    <div className={styles.welcomeHeader}>
                        {/* <p>Tavo <span>ilgalaikių</span></p>
                        <p>mitybos pokyčių</p>
                        <p>garantas</p> */}

                        <h1>Tavo <span>ilgalaikių</span></h1>
                        <h1>mitybos pokyčių</h1>
                        <h1>garantas</h1>
                    </div>

                    <div className={styles.welcomeTitle}>
                        <h2>
                            Čia išmoksi sveikatai palankios mitybos pagrindų, tapsi bendruomenės nare. Juk drauge įpročius formuoti lengviau!
                        </h2>
                    </div>

                    <div className={styles.btnContainer}>
                        <button className={styles.btn} onClick={() => navigate('/virtuve')}>Virtuvė</button>
                    </div>
                </div>

                <div className={styles.welcomeRight}>
                    <img
                        className={isAnimate ? styles.onload : ''}
                        src={images[rndNum]}
                        alt='meal-image'
                    />
                </div>
            </MainContainer>
        </Section>
    );
};

export default WelcomeSection;
