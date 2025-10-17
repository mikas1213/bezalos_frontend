import styles from './EducationSection.module.css';
import { Container, Cluster } from '../../../../../components/Shared';
import { EducationIcon } from './EducationIcon';

const educations: string[] = ['Biomedicinos', 'VU Psichologija', 'Kognityvinės elgesio terapijos studijos', 'Schemų terapijos studijos'];

export const EducationSection = () => {
    return (
        <Container maxWidth='100vw' padding='0'>
            <Container>
                <Cluster justify='space-between'>
                    {educations.map(item => <Cluster className={styles.item} gap='var(--s-xs-mobi)' align='center'>
                        <EducationIcon />
                        <span>{item}</span>
                    </Cluster>)}
                </Cluster>
            </Container>
        </Container>
    );
};