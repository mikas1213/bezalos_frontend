import styles from './HeroSection.module.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Stack, Grid, Box } from '../../../../../components/Shared';
import { randomNumber } from '../../../../../utils/randomNumber';
import { homepageImages } from '../../../../../assets/images/homepage';

export const HeroSection = () => {    
    const navigate = useNavigate();
    const heroSectionClasses = [
        styles.hereSection
    ].join(' ');
    
    useEffect(() => {
        setIsOnload(true);
        return () => setIsOnload(false);
    }, []);

    const [isOnload, setIsOnload] = useState<boolean>(false);
    const startNumber: number = randomNumber(0, 4);
    
    return (
        <Container as='section' maxWidth='100vw' padding='0' className={heroSectionClasses}>
            <Container maxWidth='var(--content-width)'>
                <Grid space='clamp(2rem, 4vw, 6rem)' className={styles.heroContainer}>
                    <Stack className={`${styles.left} ${ isOnload ? styles.onload : '' }`}>
                        <Box className={styles.title}>
                            <h1>Tavo <span>ilgalaikių</span></h1>
                            <h1>mitybos pokyčių</h1>
                            <h1>garantas</h1>
                        </Box>

                        <Box className={styles.subTitle}>
                            <h2>
                                Čia išmoksi sveikatai palankios mitybos pagrindų, tapsi bendruomenės nare. Juk drauge įpročius formuoti lengviau!
                            </h2>
                        </Box>

                        <Box className={styles.btnContainer}>
                            <button className={styles.btn} onClick={() => navigate('/virtuve')}>Virtuvė</button>
                        </Box>
                    </Stack>
                    <Stack className={`${styles.right} ${isOnload ? styles.onload : ''}`}>
                        <img src={Object.values(homepageImages.meals)[startNumber]} alt='meal-image' />
                    </Stack>    
                </Grid>
                
            </Container>
        </Container>
    );
};