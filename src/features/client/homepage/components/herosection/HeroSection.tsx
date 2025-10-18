import styles from './HeroSection.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIsMounted } from '../../../../../hooks';
import { Container, Stack, Grid, Box } from '../../../../../components/Shared';
import { randomNumber } from '../../../../../utils/randomNumber';
import { homepageImages } from '../../../../../assets/images/homepage';

export const HeroSection = () => {    
    const navigate = useNavigate();
    const { isMounted } = useIsMounted();
    
    const heroSectionClasses = [
        // 'padding--bottom',
        styles.hereSection
    ].join(' ');

    const [imageIndex] = useState<number>(() => {

        const saved = localStorage.getItem('heroImageIndex');
        
        if (saved !== null) {
            const prevIndex = parseInt(saved, 10);
            const nextIndex = (prevIndex + 1) % 5;
            localStorage.setItem('heroImageIndex', nextIndex.toString());
            return nextIndex;
        }
        
        const initialIndex = randomNumber(0, 4);
        localStorage.setItem('heroImageIndex', initialIndex.toString());
        return initialIndex;
    });

    return (
        <Container as='section' maxWidth='100vw' padding='0' className={heroSectionClasses}>
            <Container maxWidth='var(--content-width)'>
                <Grid space='clamp(2rem, 4vw, 6rem)' className={styles.heroContainer} min='50px'>
                    <Stack className={`${styles.left} ${ isMounted ? styles.onload : '' }`}>
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
                    <Stack className={`${styles.right} ${isMounted ? styles.onload : ''}`}>
                        <img src={Object.values(homepageImages.meals)[imageIndex]} alt='meal-image' />
                    </Stack>    
                </Grid>
                
            </Container>
        </Container>
    );
};