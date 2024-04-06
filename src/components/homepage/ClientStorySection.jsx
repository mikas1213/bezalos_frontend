import styles from './ClientStorySection.module.css';
import AuthorImg from '../../assets/images/homepage/client-story.webp';


const AboutSection = () => {
    return (
        <section className={`${styles.clientStorySection} section--hidden`}>
            <div className={styles.clientStoryContainer}>
                <div className={styles.containerRight}>
                    <img src={AuthorImg} alt="Author" />
                </div>
                <div className={styles.containerLeft}>
                    <div className={styles.clientStoryMsg}>
                        <p>Iš 92kg į 60kg</p>
                    </div>
                    <div className={styles.clientStoryTxt}>
                        <div>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                            <p>Reiciendis neque repellat maxime sint pariatur voluptatem, </p>
                            <p>consectetur asperiores animi dignissimos. Laborum sint eos vitae</p>
                            <p>quis et ab facere corporis, aliquam libero?</p>
                        </div>
                        <div>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                            <p>Reiciendis neque repellat maxime sint pariatur voluptatem, </p>
                            <p>consectetur asperiores animi dignissimos. Laborum sint eos vitae</p>
                            <p>quis et ab facere corporis, aliquam libero?</p>
                        </div>

                        <div>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                            <p>Reiciendis neque repellat maxime sint pariatur voluptatem, </p>
                            <p>consectetur asperiores animi dignissimos. Laborum sint eos vitae</p>
                            <p>quis et ab facere corporis, aliquam libero?</p>
                        </div>
                    </div>
                    {/* <img className={styles.signature} src={SignatureImg} alt="Su Meile Be Žalos" /> */}
                </div>
                
            </div>
        </section>
    );
};

export default AboutSection;