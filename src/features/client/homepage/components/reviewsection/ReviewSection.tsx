import { Container, Grid, Stack } from '../../../../../components/Shared';
import { SectionTitle, ReviewCard } from '../../../../../components/Shared';
import { useMediaQuery } from '../../../../../contexts/MediaQueryProvider';
import { REVIEWS } from './constants';


export const ReviewSection = () => {
    const mediaQuery: number = useMediaQuery();
    return (
        <Container as='section' id='reviews' maxWidth='var(--content-width)' className='section--hidden padding--b'>
            <Stack space={mediaQuery < 577 ? 'var(--s-xl-mobi)' : 'var(--s-xl-desk)'}>
                <SectionTitle 
                    title='Klientų patirtys'
                    subTitle='Ką apie Valgau be žalos kalba bendruomenės merginos'
                />

                <Grid min='265px'>
                    {REVIEWS.map((item, i) => <ReviewCard title={item.title} text={item.text} key={i} /> )}
                </Grid>
            </Stack>
        </Container>
    );
};
