import styles from './AboutSection.module.css';
import { useMediaQuery } from '../../../../../contexts/MediaQueryProvider';
import { Box, Container, Cluster, Grid, Stack } from '../../../../../components/Shared';
import image from '../../../../../assets/images/homepage/author2.webp';
import signature from '../../../../../assets/images/homepage/signature.webp';

export const AboutSection = () => {
    const mediaQuery = useMediaQuery();
    return (
        <Container as='section' maxWidth='100vw' padding='0'>
            <Container maxWidth='var(--content-width)'>
                 <Grid space='clamp(2rem, 4vw, 6rem)' className={styles.aboutContainer} min='200px'>
                    <Box className={styles.left}>
                        <img src={image} alt='author-image' />
                    </Box>    

                    <Cluster className={styles.right} dir='column' justify='space-between' gap={mediaQuery < 577 ? 'var(--s-md-mobi)' : '0'}>
                        <Stack space='var(--s-xs-mobi)'>
                            <h5>Labas, esu Sandra</h5>
                            <Box>
                                <h1>Pavargai nuolat</h1>
                                <h1>mąstyti apie </h1>
                                <h1>maistą?</h1>
                            </Box>
                        </Stack>
                        
                        <Stack space='var(--s-lg-mobi)'>
                            <p>Čia ramybę ras tos, kurios pavargo nuo nuolatinio savęs alinimo vis nauja dieta, ataugančio su kaupu svorio ar kitų savęs ribojimų. Šioje bendruomenėje išmoksi sveikatai palankios mitybos pagrindų, kurie be ribojimo leis tau atkurti sveiką santykį su maistu.</p>
                            <p>Taip pat padėsiu tau geriau pažinti save, savo mintis, emocijas ir kūno pojūčius, kurie tave atveda į apsivalgymus ar kitus iššūkius. Kartu galime įveikti visus, su valgymu susijusius sunkumus 💚</p>
                        </Stack>
                        <img src={signature} alt='signature' className={styles.signature}/>
                    </Cluster>
                </Grid>
            </Container>
        </Container>
    );
};