import styles from "./ExperienceSection.module.css";
import { useState, useEffect } from "react";
import Section from '../../../../../components/homepage/ui/Section';
import MainContainer from '../../../../../components/homepage/ui/MainContainer';

const ExperienceItem = ({myStyle, value, text}) => {
    return (
        <div className={myStyle}>
            <h3>{value}</h3>
            <h4>{text}</h4>
        </div>
    );
};

export const ExperienceSection = () => {
    const [isAnimate, setIsAnimate] = useState();
    useEffect(() => {
        setIsAnimate(true);
        return () => setIsAnimate(false);
    }, []);
    
    const style = `${styles.experienceItem} ${isAnimate ? styles.onload : ''}`;
    return (
        <Section>
            <MainContainer customClass={styles.experienceContainer}>
                <ExperienceItem myStyle={style} value='8m+' text='darbo patirtis' />
                <ExperienceItem myStyle={style} value='1,7k+' text='laimingų klientų' />
                <ExperienceItem myStyle={style} value='85+' text='mentorystės istorijos' />
                <ExperienceItem myStyle={style} value='1,3k+' text='mitybos planų' />
            </MainContainer>
        </Section>
    );
};


