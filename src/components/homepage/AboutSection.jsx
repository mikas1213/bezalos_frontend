import styles from './AboutSection.module.css';
import AuthorImg from '../../assets/images/homepage/author_1260x1080.webp';
import SignatureImg from '../../assets/images/homepage/signature.png';
import Section from './ui/Section';
import MainContainer from './ui/MainContainer';

const AboutSection = () => {
    return (
        <Section customClass='section--hidden'>
            <MainContainer customClass={styles.aboutContainer}>
            {/* <div className={styles.aboutContainer}> */}
                <div className={styles.aboutLeft}>
                    <div className={styles.aboutMsg}>
                        Labas, su tavim sveikinuosi aš, Sandra, iš projekto Valgau Be Žalos
                    </div>
                    <div className={styles.aboutTxt}>
                        <div>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit Reiciendis neque repellat maxime sint pariatur voluptatem consectetur asperiores animi dignissimos. Laborum sint eos vitae quis et ab facere corporis, aliquam libero?</p>
                        </div>

                        <div>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit Reiciendis neque repellat maxime sint pariatur voluptatem consectetur asperiores animi dignissimos. Laborum sint eos vitae quis et ab facere corporis, aliquam libero?</p>
                        </div>
                    </div>
                    <img className={styles.signature} src={SignatureImg} alt="Su Meile Be Žalos" />
                </div>
                <div className={styles.aboutRight}>
                    <img src={AuthorImg} alt="Author" />
                </div>
            {/* </div> */}
            </MainContainer>
        </Section>
    );
};

export default AboutSection;