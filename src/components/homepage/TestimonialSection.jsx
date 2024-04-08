import styles from "./TestimonialSection.module.css";
import Section from "./ui/Section";
import MainContainer from "./ui/MainContainer";

import { FaStar } from "react-icons/fa6";

const text = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.';
const TestimonialCard = ({title, text}) => {
    return (
        <div className={styles.testimonialCard}>
            <div className={styles.title}>{title}</div>
            <div className={styles.text}>{text}</div>
            <div className={styles.stars}>
                {Array.from({length: 5}, (v, i) => <FaStar className={styles.icon} key={i}/>)}
            </div>
        </div>
    );
};

const TestimonialSection = () => {

    return (
        <Section customClass='section--hidden'>
            <MainContainer customClass={styles.testimonialContainer}>
                <TestimonialCard title='Awesome tool!' text={text}/>
                <TestimonialCard title='Awesome tool!' text={text}/>
                <TestimonialCard title='Awesome tool!' text={text}/>
            </MainContainer>
        </Section>
    );
};

export default TestimonialSection;
