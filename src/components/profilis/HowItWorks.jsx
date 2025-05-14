import styles from './HowItWorks.module.css';
import { Link } from 'react-router-dom';

const HowItWorks = ({title, tutorial_link}) => {
    return (
        <div className={styles.howitworks}>
            <h1>{title}</h1>
            <p><Link to={tutorial_link} target='_blank' rel='noopener noreferrer'>Kaip tai veikia? 🔗</Link></p>
        </div>
    );
};

export default HowItWorks;