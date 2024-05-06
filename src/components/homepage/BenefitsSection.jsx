import styles from './BenefitsSection.module.css';
import Section from './ui/Section';
import MainContainer from './ui/MainContainer';

// ICONS collection: https://www.svgrepo.com/collection/ecommerce-15
// PNG
// import Icon1 from '../../assets/icons/png/benefits/interaktyvus-mitybos-planas.png';
// import Icon2 from '../../assets/icons/png/benefits/merginu-bendruomene.png';
// import Icon3 from '../../assets/icons/png/benefits/emocinio-valgymo-dienorastis.png';
// import Icon4 from '../../assets/icons/png/benefits/pokyciu-statistika.png';

// SVG
import Icon1 from '../../assets/icons/svg/benefits/interaktyvus-mitybos-planas.svg';
import Icon2 from '../../assets/icons/svg/benefits/merginu-bendruomene.svg';
import Icon3 from '../../assets/icons/svg/benefits/emocinio-valgymo-dienorastis.svg';
import Icon4 from '../../assets/icons/svg/benefits/pokyciu-statistika.svg';

const BenefitItem = ({icon, title, text}) => {
    return (
        <div className={styles.benefitItem}>
            <img src={icon} alt='icon' className={styles.icon}/>

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
        
        <Section customClass={`${styles.benefitsSection} section--hidden`}>
            <MainContainer customClass={styles.benefitsContainer}>
                <div className={styles.benefits}>
                    <BenefitItem icon={Icon1} title='Interaktyvų mitybos planą' text={text}/>
                    <BenefitItem icon={Icon2} title='Merginų bendruomenę' text={text}/>
                    <BenefitItem icon={Icon3} title='Emocinio valgymo dienoraštį' text={text}/>
                    <BenefitItem icon={Icon4} title='Pokyčių statistiką' text={text}/>
                </div>
            </MainContainer>
        </Section> 
    );
};

export default BenefitsSection; 