import styles from "./WelcomeSection.module.css";
import Burger from "../../assets/images/burger_1024x840_croped.png";

import { useState, useEffect } from "react";

const WelcomeSection = () => {
    const [isAnimate, setIsAnimate] = useState();

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
                        <p>Lorem ipsum dolor sit amet consectetur</p>
                        <p>Adipisci dolores quasi cumque atque elit</p>
                        <p>laudantium numquam dignissimos aliquam sit</p>
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
