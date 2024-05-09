import styles from './ClientStorySection.module.css';
import AuthorImg from '../../assets/images/homepage/client-story.webp';
import Section from './ui/Section';
import MainContainer from './ui/MainContainer';

const AboutSection = () => {
    return (
        <Section customClass='section--hidden'>
            <MainContainer customClass={styles.clientStoryContainer}>
                <div className={styles.containerLeft}>
                    <div className={styles.clientStoryTitle}>
                        Kartu iš 92kg į 60kg
                    </div>

                    <div className={styles.clientStoryText}>
                        Su kliente susipažinome tuomet, kai ji pavargusi nuo mažo maisto kiekio apsisprendė daugiau savęs nealinti, nes net ir valgant mažai svoris vis tiek nekrito.
                    </div>
                        
                    <div className={styles.clientStoryText}>
                        Tuomet paruošėme mitybos planą ir dirbome su priežiūra, kurios metu bendravome ko ne kasdien, kad būtų atsakyti visi įmanomi klausimai, būtų aišku kodėl ir ką reikia daryti ir taip kartu keliaujant per 11 mėnesių pavyko atsikratyti net 30 kg, suformuoti ilgalaikius įpročius, kurių dėka mums susitikus net ir dar po metų klientė džiaugėsi tais pačiais pasiektais rezultatais.
                    </div>

                    <div className={styles.clientStoryText}>
                        Dirbant kartu visuomet formuojame naujus įpročius, kurie leistų ne tik pasiekti, bet ir išlaikyti pasiektą rezultatą su meile ir #bežalos 💚
                    </div>

                </div>
                <div className={styles.containerRight}>
                    <img src={AuthorImg} alt="Author" />
                </div>
            </MainContainer>
        </Section>
    );
};

export default AboutSection;