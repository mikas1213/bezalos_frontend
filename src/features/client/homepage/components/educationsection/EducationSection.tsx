import styles from './EducationSection.module.css';
import { Box,Container, Cluster, Stack } from '../../../../../components/Shared';
import { EducationIcon } from './EducationIcon';
import { useMediaQuery } from '../../../../../contexts/MediaQueryProvider';
type Items = {
    row1: string,
    row2: string
}
const educations: string[] = ['Biomedicinos', 'VU Psichologija', 'Kognityvinės elgesio terapijos studijos', 'Schemų terapijos studijos'];

const items: Items[] = [
    { row1: 'Biomedicinos', row2: ''},
    { row1: 'VU Psichologija', row2: ''},
    { row1: 'Kognityvinės elgesio', row2: 'terapijos studijos'},
    { row1: 'Schemų terapijos', row2: 'studijos'}
];

export const EducationSection = () => {
    const mediaQuery = useMediaQuery();

    return (
        <Container maxWidth='100vw' padding='0'>
            <Container>
                <Cluster justify='space-between'>
                    {items.map(item => 
                        <Cluster 
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