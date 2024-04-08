import styles from './Section.module.css';

const Section = ({children, customClass = ''}) => {
    const sectionClasses = `${styles.section} ${customClass}`;
    return (
        <section className={sectionClasses}>
            {children}
        </section>
    );
};

export default Section;