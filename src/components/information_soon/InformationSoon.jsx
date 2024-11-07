import styles from './InformationSoon.module.css';
import Section from '../homepage/ui/Section';
import MainContainer from '../homepage/ui/MainContainer';
import kuskis from '../../assets/images/pasimatom-netrukus.webp';

const InformationSoon = () => {
    return (
        <Section>
            <MainContainer>
                <div className={styles.informationSoonContainer}>
                    <img src={kuskis} alt='cat image' />
                    <span>Informacija ruošiama</span>
                    <span>pasimatome jau netrukus</span>
                </div>
            </MainContainer>
        </Section>
    );
};

export default InformationSoon;