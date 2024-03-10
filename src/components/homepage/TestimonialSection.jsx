import styles from "./TestimonialSection.module.css";

const TestimonialCard = ({title, text}) => {
    return (
        <div className="testimonialItem">
            <div className="title">{title}</div>
            <div className="text">{text}</div>
        </div>
    );
};

const TestimonialSection = () => {

    return (
        <section className={`${styles.testimonialSection} section--hiddenn`}>
            <div className={styles.testimonialContainer}>
                <TestimonialCard title='labas' text='hello'/>
            </div>
        </section>
    );
};

export default TestimonialSection;
