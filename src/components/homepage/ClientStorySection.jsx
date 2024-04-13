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
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis neque repellat maxime sint pariatur voluptatem, consectetur asperiores animi dignissimos. Laborum sint eos vitae quis et ab facere corporis, aliquam libero?
                    </div>
                        
                    <div className={styles.clientStoryText}>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis neque repellat maxime sint pariatur voluptatem, consectetur asperiores animi dignissimos. Laborum sint eos vitae quis et ab facere corporis, aliquam libero?
                    </div>

                    <div className={styles.clientStoryText}>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis neque repellat maxime sint pariatur voluptatem, consectetur asperiores animi dignissimos. Laborum sint eos vitae quis et ab facere corporis, aliquam libero?
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