import styles from './EducationSection.module.css';
import { Container, Cluster, Stack } from '../../../../../components/Shared';
import { EducationIcon } from './EducationIcon';
import { useMediaQuery } from '../../../../../contexts/MediaQueryProvider';
type Items = {
    row1: string,
    row2: string
}

const items: Items[] = [
    { row1: 'Biomedicinos bakalauras', row2: ''},
    { row1: 'VU Psichologija', row2: ''},
    { row1: 'Kognityvinės elgesio', row2: 'terapijos studijos'},
    { row1: 'Schemų terapijos', row2: 'studijos'}
];

export const EducationSection = () => {
    const mediaQuery = useMediaQuery();

    return (
        <Container as='section' id='education' maxWidth='100vw' padding='0' className='section--hidden padding--b'>
            <Container>
                <Cluster justify='space-between' align='center'>
                    {items.map(item => 
                        <Cluster 
                            key={item.row1}
                            className={styles.item} 
                            gap='var(--s-sm-desk)' 
                            align='center'
                            dir={mediaQuery < 577 ? 'column' : 'row'}
                        >
                            <EducationIcon />
                            <Stack className={styles.label}>
                                <span>{item.row1}</span>
                                {item.row2 && <span>{item.row2}</span>}
                            </Stack>
                        </Cluster>
                    )}
                </Cluster>
            </Container>
        </Container>
    );
};