import styles from './AboutSection.module.css';
import AuthorImg from '../../assets/images/homepage/author_1260x1080.webp';
import SignatureImg from '../../assets/images/homepage/signature.png';
import Section from './ui/Section';
import MainContainer from './ui/MainContainer';

const AboutSection = () => {
    return (
        <Section customClass='section--hidden'>
            <MainContainer customClass={styles.aboutContainer}>
                <div className={styles.aboutLeft}>
                    <div className={styles.aboutTitle}>
                        Labas, su tavim sveikinuosi aš, Sandra, iš projekto Valgau Be Žalos
                    </div>
                    <div className={styles.aboutText}>
                        Čia stiprų apkabinimą ras tos, kurios pavargo nuo nuolatinio savęs alinimo vis nauja dieta, ataugančio su kaupu svorio ar kitų savęs ribojimų. Šioje bendruomenėje išmoksi sveikatai palankios mitybos pagrindų, kurie be ribojimo leis tau atkurti sveiką santykį su maistu.
                    </div>
                        
                    <div className={styles.aboutText}>
                        Taip pat padėsiu tau geriau pažinti save, savo mintis, emocijas ir kūno pojūčius, kurie tave atveda į apsivalgymus ar kitus su valgymu susijusius iššūkius. Kartu galime įveikti visus, su valgymu susijusius sunkumus 💚
                    </div>
                    <img className={styles.signature} src={SignatureImg} alt="Su Meile Be Žalos" />
                </div>
                <div className={styles.aboutRight}>
                    <img src={AuthorImg} alt="Author" />
                </div>
            </MainContainer>
        </Section>
    );
};

export default AboutSection;