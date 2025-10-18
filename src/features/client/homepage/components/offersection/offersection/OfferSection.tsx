import styles from './OfferSection.module.css';
import { useResponsivePadding } from '../../../../../../hooks';
import { Box, Container, Grid, Stack } from '../../../../../../components/Shared';
import { useMediaQuery } from '../../../../../../contexts/MediaQueryProvider';
import { OfferCard } from '../offercard/OfferCard';
import { type OfferCardProps } from '../types';
import offersDataRaw from '../../offersData.json';
const offersData = offersDataRaw as OfferCardProps[];

export const OfferSection = () => {
    const mediaQuery: number = useMediaQuery();
    const responsivePading = useResponsivePadding();
    
    return (
        <Container as='section' maxWidth='100vw' padding='0'>
            <Container maxWidth='var(--content-width)'>
                <Stack space='var(--s-32)'>
                    <Stack className={styles.header} space={mediaQuery < 577 ? 'var(--s-lg-mobi)' : '0'}>
                        <Box className={styles.title}>Nežinai, nuo ko pradėti?</Box>
                        <Box className={styles.subTitle}>Žemiau rasi tris skirtingus būdus pradėti – pasirink tą, kuris šiuo metu tau atdoro artimiausias</Box>
                    </Stack>

                    <Grid className={styles.OfferCards} space={responsivePading} 
                        // min={mediaQuery > 768 ? '299px' : '272px'}
                        min='256px'
                    >
                        {offersData.map(card => <OfferCard key={card.id} card={card} />)}
                    </Grid>
                </Stack>
            </Container>
        </Container>
    );
};