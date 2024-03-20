import styles from "./WelcomeSection.module.css";

// import Burger from "../../assets/images/homepage/main-meal-burger.png";  
// import Pancakes from "../../assets/images/homepage/main-meal-pancakes.png";
// import Salat from "../../assets/images/homepage/main-meal-salad.png";
// import Sandwich from "../../assets/images/homepage/main-meal-sandwich.png";
// import Vegetables from "../../assets/images/homepage/main-meal-vegetables.png";
import Burger from "../../assets/images/homepage/burger.png";
// import copy_one from "../../assets/images/homepage/square-salad.png";
// import copy_two from "../../assets/images/homepage/square-pancakes.png";
// import copy_three from "../../assets/images/homepage/square-vegetables.png";
// import Burger_2500 from "../../assets/images/homepage/burger_2500x2050.png";
// import Burger_3048 from "../../assets/images/homepage/burger_3048x2500.png";


import { useState, useEffect } from "react";
// const images = [Burger, Pancakes, Sandwich, Salat, Vegetables];
// const images = [copy_one, copy_two, copy_three, Burger_2500, Burger_3048];
// const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const WelcomeSection = () => {
    const [isAnimate, setIsAnimate] = useState();
    
    // const randomPhoto = randomIntFromInterval(3, 3);
    

    useEffect(() => {
        setIsAnimate(true);
        return () => setIsAnimate(false);
    }, []);

    return (
        <section className={styles.welcomeSection}>
            <div className={styles.welcomeContainer}>
                <div
                    className={`${styles.welcomeLeft} ${
                        isAnimate ? styles.onload : ""
                    }`}
                >
                    <div className={styles.welcomeMsg}>
                        <p>
                            Tavo <span>ilgalaikių</span>
                        </p>
                        <p>mitybos pokyčių</p>
                        <p>garantas</p>
                    </div>
                    <div className={styles.welcomeTxt}>
                        <p>Begalė bandymų neatnešė norimų rezultatų?</p>
                        <p>Čia išmoksi sveikatai palankios mitybos pagrindų, tapsi</p>
                        <p>bendruomenės nare. Juk drauge įpročius formuoti lengviau!</p>
                    </div>
                    <div>
                        <button className={styles.btn}>Virtuvė</button>
                    </div>
                </div>

                <div className={styles.welcomeRight}>
                    <img
                        className={isAnimate ? styles.onload : ""}
                        src={Burger}
                        alt="Burger"
                    />
                </div>
            </div>
        </section>
    );
};

export default WelcomeSection;
