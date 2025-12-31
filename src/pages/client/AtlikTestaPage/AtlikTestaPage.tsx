import styles from './AtlikTestPage.module.css';
import { useMediaQuery } from '../../../contexts/MediaQueryProvider';
import { Box, Container, Cluster, Grid, Stack } from '../../../components/Shared';
import image from '../../../assets/images/atliktesta/sandra-with-laptop.webp';
import signature from '../../../assets/images/homepage/signature.webp';
import { ButtonSave } from '../../../components/Shared/Buttons';
import { useNavigate } from 'react-router-dom';

const AtlikTestaPage = () => {
    const mediaQuery = useMediaQuery();
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/atlik-testa/valgymo-elgsenos-testas');
    };

    return (
        <Container as='section' maxWidth='100vw' padding='0' className={styles.atlikTestaPage}>

            <Container maxWidth='var(--content-width)'>
                 <Grid space='clamp(2rem, 4vw, 6rem)' className={styles.aboutContainer} min='200px'>
                    <Box className={styles.left}>
                        <img src={image} alt='author-image' />
                    </Box>

                    {mediaQuery < 577 && <Stack space='var(--s-xs-mobi)'>
                        <h5 className={styles.headerSmall}>Labas, esu Sandra</h5>
                        <Box>
                            <h1 className={styles.headerBig}>Labai stengiesi,</h1>
                            <h1 className={styles.headerBig}>bet vis tiek persivalgai?</h1>
                        </Box>
                    </Stack>}

                    <Cluster className={styles.right} dir='column' justify='space-between' gap={mediaQuery < 577 ? 'var(--s-md-mobi)' : '0'}>
                        {mediaQuery > 576 && <Stack space='var(--s-xs-mobi)'>
                            <h5 className={styles.headerSmall}>Labas, esu Sandra</h5>
                            <Box>
                                <h1 className={styles.headerBig}>Labai stengiesi,</h1>
                                <h1 className={styles.headerBig}>bet vis tiek persivalgai?</h1>
                            </Box>
                        </Stack>}

                        <Stack space='var(--s-lg-mobi)'>
                            <p>Šis testas skirtas toms, kurios nori geriau suprasti savo santykį su maistu ir tai, kas jį formuoja. Atlikusi jį sužinosi, koks valgymo elgesys tau būdingesnis ir kas dažniausiai paskatina norą valgyti – alkis, emocijos ar aplinka.</p>
                            <p>Testas padeda aiškiau pamatyti pasikartojančius valgymo modelius, sumažinti kaltę ir pradėti pokyčius ne per ribojimą, o per supratimą 💚</p>
                        </Stack>
                        <ButtonSave label='Atlikti testą' className={styles.atliktiButton} onClick={handleClick} />
                        <img src={signature} alt='signature' className={styles.signature}/>
                    </Cluster>

                </Grid>
            </Container>
        </Container>
    );
}

export default AtlikTestaPage;
