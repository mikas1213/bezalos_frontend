import styles from './BenefitsSection.module.css';
import Section from './ui/Section';
import MainContainer from './ui/MainContainer';

import Icon1 from '../../assets/icons/benefits/interaktyvus-mitybos-planas.png';
import Icon2 from '../../assets/icons/benefits/merginu-bendruomene.png';
import Icon3 from '../../assets/icons/benefits/emocinio-valgymo-dienorastis.png';
import Icon4 from '../../assets/icons/benefits/pokyciu-statistika.png';



const BenefitItem = ({icon, title, text}) => {
    return (
        <div className={styles.benefitItem}>
            <img src={icon} alt="icon" className={styles.icon}/>
            <div className={styles.message}>
                <div className={styles.title}>{title}</div>
                <div className={styles.text}>{text}</div>
            </div>
        </div>
    );
};

const BenefitsSection = () => {
  
    const text = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text.';
    return (
        
        <Section customClass={`${styles.benefitsSection} section--hiddenn`}>
            <MainContainer customClass={styles.benefitsContainer}>
            {/* <div className={styles.benefitsContainer}> */}
                {/* <div className={styles.benefitHeader}>Dirbant kartu tavęs laukia</div> */}
                <div className={styles.benefits}>
                    <BenefitItem icon={Icon1} title='Interaktyvų mitybos planą' text={text}/>
                    <BenefitItem icon={Icon2} title='Merginų bendruomenę' text={text}/>
                    <BenefitItem icon={Icon3} title='Emocinio valgymo dienoraštį' text={text}/>
                    <BenefitItem icon={Icon4} title='Pokyčių statistiką' text={text}/>
                </div>
            </MainContainer>
            {/* </div> */}
        </Section> 
    );
};

export default BenefitsSection; 