import styles from "./TestimonialSection.module.css";
import Section from "./ui/Section";
import MainContainer from "./ui/MainContainer";

import { FaStar } from "react-icons/fa6";

const reviews = [
    {title: 'Narystė Virtuvėje', text: 'Kuriamas turinys labai patinka, video visi naudingi, visus perklausiau, ir po truputi stengiuosi įtvirtinti išgirstą informaciją savo rutinoje'},
    {title: 'Produktų keitimo funkcija', text: 'Keityklės dėka vietoj alyvuogių galiu legaliai valgyti šokoladą ir tai puikiai atitinka mano mitybos planą! Ačiū tau, pagaliau esu visiškai rami dėl savo maisto pasirinkimų'},
    {title: 'Svorio pokyčiai', text: 'Vien sekant tavo turinį per 5 mėnesius man pavyko atsikratyti 17 kilogramų! Ačiū tau už tokį naudingą ir praktiškai lengvai taikomą turinį 💚'}
];
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
                {reviews.map((t, i) => <TestimonialCard title={t.title} text={t.text} key={i}/> )}
            </MainContainer>
        </Section>
    );
};

export default TestimonialSection;
