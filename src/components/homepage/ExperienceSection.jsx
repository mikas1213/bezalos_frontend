import styles from "./ExperienceSection.module.css";
import { useState, useEffect } from "react";

const ExperienceItem = ({myStyle, value, text}) => {
    return (
        <div className={myStyle}>
            <h3 className={styles.value}>{value}</h3>
            <h4 className={styles.txt}>{text}</h4>
        </div>
    );
};

const ExperienceSection = () => {
    const [isAnimate, setIsAnimate] = useState();
    useEffect(() => {
        setIsAnimate(true);
        return () => setIsAnimate(false);
    }, []);
    
    const style = `${styles.experienceItem} ${isAnimate ? styles.onload : ''}`;
    return (
        <section className={styles.experienceSection}>
            <div className={styles.experienceContainer}>
                <ExperienceItem myStyle={style} value='7m+' text='darbo patirtis' />
                <ExperienceItem myStyle={style} value='1.2k+' text='laimingų klientų' />
                <ExperienceItem myStyle={style} value='50+' text='mentorystės istorijų' />
                <ExperienceItem myStyle={style} value='1k+' text='mitybos planų' />
            </div>
        </section>
    );
};

export default ExperienceSection;
