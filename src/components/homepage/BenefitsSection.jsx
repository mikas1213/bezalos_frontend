import styles from './BenefitsSection.module.css';

import {
    InteraktyvusMitybosPlanas,
    MerginuBendruomene,
    EmocinioValgymoDienorastis,
    PokyciuStatistika
} from './SvgIcons';



const BenefitItem = ({icon, title, text}) => {
    return (
        <div className={styles.benefitItem}>
            <div className={styles.icon}>{icon}</div>
            <div className={styles.message}>
                <div className={styles.title}>{title}</div>
                <div className={styles.text}>{text}</div>
            </div>
        </div>
    );
};

const BenefitsSection = () => {
  
    const text = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of.';
    return (
        <section className={`${styles.benefitsSection} section--hiddenn`}>
           
            <div className={styles.benefitsContainer}>
                <div className={styles.benefitTitle}>Dirbant kartu tavęs laukia</div>
                <div className={styles.benefits}>
                    <BenefitItem icon={<InteraktyvusMitybosPlanas className={styles.icon}/>} title='Interaktyvų mitybos planą' text={text}/>
                    <BenefitItem icon={<MerginuBendruomene />} title='Merginų bendruomenę' text={text}/>
                    <BenefitItem icon={<EmocinioValgymoDienorastis />} title='Emocinio valgymo dienoraštį' text={text}/>
                    <BenefitItem icon={<PokyciuStatistika />} title='Pokyčių statistiką' text={text}/>
                    
                    
                    
                    
                </div>
                
            </div>
        </section>
    );
};

export default BenefitsSection; 