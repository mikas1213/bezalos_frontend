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

// icons collenction https://www.svgrepo.com/collection/ecommerce-15/
const BenefitsSection = () => {
    const benefits = [
        {title: 'Interaktyvus mitybos planas', text: 'Mitybos planas leis tau mokytis sveikatai palankios mitybos pagrindų, kurių dėka galiu garantuoti tau ilgalaikius rezultatus!', icon: Icon1},
        {title: 'Merginų bendruomenė', text: 'Virtuvėje turėsi nuolatinį merginų palaikymą, galimybę klausti, dalintis kasdieniais iššūkiais ir juos spręsti 💚', icon: Icon2},
        {title: 'Emocinio valgymo dienoraštis', text: 'Dienoraštis suteiks tau galimybę geriau pažintis emocijas, kurias esi likusi malšinti maistu, rasti naujų įveikos būdų.', icon: Icon3},
        {title: 'Pokyčių statistika', text: 'Lengvai ir interantyviai galėsi stebėti savo ilgalaikius pokyčius, kurie suteiks papildomos motyvacijos nuosekliai judėti tikslų link.', icon: Icon4}
    ];

    return (
        
        <Section customClass={`${styles.benefitsSection} section--hidden`}>
            <MainContainer customClass={styles.benefitsContainer}>
                <div className={styles.benefits}>
                    {benefits.map((b, i) => <BenefitItem key={i} icon={b.icon} title={b.title} text={b.text}/> )}
                </div>
            </MainContainer>
        </Section> 
    );
};

export default BenefitsSection; 